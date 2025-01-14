import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState, useContext } from "react";
import { Formik, Form } from "formik";
import { authContext } from "./AuthProvider";
import Input from "./common/Input";
import PasswordInput from "./common/PasswordInput";
import AuthButton from "./common/AuthButton";
import * as Yup from "yup";
import axios from "axios";
import { toast } from "react-hot-toast";

// Validation schema using Yup
const schema = Yup.object({
  username: Yup.string().min(4, "Username should be more than 4 characters.").required("Required."),
  password: Yup.string()
    .min(8, "Password must be 8 or more characters.")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter.")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter.")
    .matches(/[0-9]/, "Password must contain at least one digit.")
    .required("Required."),
});

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useContext(authContext);
  const navigate = useNavigate();
  const { state } = useLocation();

  const path = state?.redirectTo || "/";

  const handleSubmit = async (values, actions) => {
    actions.setSubmitting(true);
    console.log(values);

    try {
      // Add a slight delay for the loading animation to be visible
      await new Promise((resolve) => setTimeout(resolve, 1500)); // Adjust the delay as needed

      // Make the API call to your backend for authentication
      const response = await axios.post(
        "http://127.0.0.1:8000/auth/login/", // Replace with your actual backend URL
        values,
        { withCredentials: true } // Send cookies with the request (useful for JWT sessions)
      );

      console.log("Login response:", response.data);

      // Assuming you store a token or handle the user session here
      login(); // Call your context to update the user state (authentication success)

      toast.success("Login successful!");

      // Reset the form and navigate
      actions.resetForm();
      navigate(path); // Redirect to the previous page or home page
    } catch (error) {
      console.error("Login error:", error);

      // Display an error message from the server or a default message
      const errorMessage = error.response?.data?.message || "Login failed. Please try again.";
      toast.error(errorMessage);

      // Set form errors for display
      actions.setErrors({ server: errorMessage });
    } finally {
      actions.setSubmitting(false); // Stop the loading animation
    }
  };

  const togglePassword = () => setShowPassword((state) => !state);

  return (
    <section className="flex-grow min-h-screen bg-zinc-200 dark:bg-night-200 flex justify-center items-center mt-10">
      <Formik
        initialValues={{ username: "", password: "" }}
        validationSchema={schema}
        onSubmit={handleSubmit}
      >
        <Form className="bg-gray-200 rounded-md w-11/12 max-w-2xl px-6 py-5 flex flex-col items-center gap-5">
          <h2 className="text-xl sm:text-3xl text-night-200 font-bold uppercase">
            Welcome Back
          </h2>

          {/* Username input */}
          <Input type="text" name="username" placeholder="Enter your username." />

          {/* Password input */}
          <PasswordInput
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Enter your password."
            handleToggle={togglePassword}
            showPassword={showPassword}
          />

          {/* Forgot Password Link */}
          <Link
            to="/forgot-password"
            className="text-sm text-orange-200 hover:underline self-end mt-[-10px]"
          >
            Forgot Password?
          </Link>

          <AuthButton action="logging in...">Log in</AuthButton>

          <div className="font-bold font-openSans text-base text-night-200 flex flex-col items-center sm:flex-row gap-2">
            <p>Don&apos;t have an account?</p>
            <Link to="/signup" className="text-orange-200 hover:underline">
              Create one now
            </Link>
          </div>
        </Form>
      </Formik>
    </section>
  );
}

export default Login;

