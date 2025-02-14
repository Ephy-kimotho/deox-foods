import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { Formik, Form } from "formik";
import { useToken } from "./AuthProvider";
import Input from "./common/Input";
import PasswordInput from "./common/PasswordInput";
import AuthButton from "./common/AuthButton";
import { toast } from "react-hot-toast";
import { sanitizeFormData } from "../utils/utils";
import { BASE_URL } from "../utils/utils";
import { TriangleAlert } from "lucide-react";
import * as Yup from "yup";
import axios from "axios";

// Validation schema using Yup
const schema = Yup.object({
  username: Yup.string()
    .min(4, "Username should be more than 4 characters.")
    .required("Required."),
  password: Yup.string()
    /*  .min(8, "Password must be 8 or more characters.") */
    /*   .matches(/[A-Z]/, "Password must contain at least one uppercase letter.")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter.")
    .matches(/[0-9]/, "Password must contain at least one digit.") */
    .required("Required."),
});

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const { setToken } = useToken();
  const navigate = useNavigate();
  const { state } = useLocation();

  const path = state?.redirectTo || "/";

  const handleSubmit = async (values, actions) => {
    actions.setSubmitting(true);
    try {
      const updatedValues = sanitizeFormData(values); // sanitizeFormData will remove any occurrence of whitespaces from all form values

      // Make the API call to your backend for authentication
      const response = await axios.post(
        `${BASE_URL}/auth/token/`,
        updatedValues,
        {
          headers: {
            Accept: "application/json",
          },
        }
      );

      // set access token to AuthProvider context
      const accessToken = response.data.access;
      setToken(accessToken);
      // Reset the form and navigate
      actions.resetForm();

      const res = await axios.get(`${BASE_URL}/restaurant/user-type/`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const userType = res.data.user_type;
      if (userType === "restaurant") {
        navigate("/admin", {
          state: { restaurantName: res.data.restaurant_name },
        });
      } else if (userType === "customer" && path === "/admin") {
        setToken("");
        toast.custom(
          <div className="py-3 px-3 rounded-md bg-white shadow-md flex gap-2 justify-center items-center">
            <TriangleAlert className="text-orange-200" />
            <span>You are not an admin.</span>
          </div>
        );
      } else {
        toast.success("Login successful!");
        navigate(path);
      }
    } catch (error) {
      // Display an error message from the server or a default message
      const errorMessage =
        error.response?.data?.detail || "Login failed. Please try again.";
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
          <Input
            type="text"
            name="username"
            placeholder="Enter your username."
          />

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
