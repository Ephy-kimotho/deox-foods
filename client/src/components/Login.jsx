import { Link } from "react-router-dom";
import { useState } from "react";
import { Formik, Form } from "formik";
import Input from "./common/Input";
import PasswordInput from "./common/PasswordInput";
import AuthButton from "./common/AuthButton";
import * as Yup from "yup";
import LoadingSpinner from "./LoadingSpinner";
import axios from "axios"; // Import Axios

const schema = Yup.object({
  email: Yup.string().email("Invalid email address").required("Required."),
  password: Yup.string()
    .min(8, "Password must be 8 or more characters.")
    .required("Required."),
});

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const handleSubmit = async (values, actions) => {
    actions.setSubmitting(true);
    setIsSending(true); // Set sending state to true
    console.log("Values: ", values);

    const timeout = setTimeout(async () => {
      try {
        const response = await axios.post("/api/signup", values);
        console.log("Response: ", response.data);

        // Reset the form on success
        actions.resetForm();
      } catch (error) {
        console.error("Error during form submission: ", error);
      } finally {
        // Clear the timeout and stop submitting
        clearTimeout(timeout);
        actions.setSubmitting(false);
        setIsSending(false); // Hide the spinner after the delay
      }
    }, 500); // Adjust the timeout duration as needed (e.g., 500ms)
  };

  const togglePassword = () => setShowPassword((state) => !state);

  return (
    <section className="flex-grow min-h-screen bg-zinc-200 dark:bg-night-200 flex justify-center items-center mt-10">
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={schema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, touched, errors, handleChange, handleBlur, values }) => (
          <Form className="bg-gray-200 rounded-md w-4/5 max-w-2xl px-6 py-5 flex flex-col items-center gap-5">
            <h2 className="text-xl sm:text-3xl text-night-200 font-bold uppercase">
              Welcome Back
            </h2>
            <Input
              type="email"
              name="email"
              placeholder="Enter your email."
              value={values.email} // Use Formik's value
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.email && errors.email} // Display error message
            />
            <PasswordInput
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Enter your password."
              handleToggle={togglePassword}
              showPassword={showPassword}
              value={values.password} // Use Formik's value
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.password && errors.password} // Display error message
            />
            {/* Forgot Password Link */}
            <Link
              to="/forgot-password"
              className="text-sm text-orange-200 hover:underline self-end mt-[-10px]"
            >
              Forgot Password?
            </Link>
            <AuthButton disabled={isSubmitting || isSending}>
              {isSending ? (
                <div className="flex justify-center items-center">
                  <LoadingSpinner />
                </div>
              ) : (
                "Log in"
              )}
            </AuthButton>

            <div className="font-bold font-openSans text-base text-night-200 flex flex-col items-center sm:flex-row gap-2">
              <p>Don&apos;t have an account?</p>
              <Link to="/signup" className="text-orange-200 hover:underline">
                Create one now
              </Link>
            </div>
          </Form>
        )}
      </Formik>
    </section>
  );
}

export default Login;

