import { Link } from "react-router-dom";
import { Formik, Form } from "formik";
import AuthButton from "./common/AuthButton";
import Input from "./common/Input";
import PasswordInput from "./common/PasswordInput";
import * as Yup from "yup";
import { useState } from "react";
import LoadingSpinner from "./LoadingSpinner";
import axios from "axios";

const schema = Yup.object({
  username: Yup.string()
    .min(4, "Username should be more than 4 characters.")
    .required("Required."),
  email: Yup.string().email("Invalid email address.").required("Required."),
  password: Yup.string()
    .min(8, "Password must be 8 or more characters.")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter.")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter.")
    .matches(/[0-9]/, "Password must contain at least one digit.")
    .required("Required."),
});

function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [showSpinner, setShowSpinner] = useState(false); // Local state for spinner visibility

  const handleSubmit = async (values, actions) => {
    // Set the form as submitting and show spinner
    actions.setSubmitting(true);
    setShowSpinner(true); // Show the spinner

    // Introduce a timeout to simulate delay and ensure spinner is visible
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
        setShowSpinner(false); // Hide the spinner after the delay
      }
    }, 500); // Adjust the timeout duration as needed (e.g., 500ms)
  };

  const togglePassword = () => setShowPassword((state) => !state);

  return (
    <section className="flex-grow min-h-screen bg-zinc-200 dark:bg-night-200 min-h-sc flex items-center justify-center mt-10 ">
      <Formik
        initialValues={{ username: "", email: "", password: "" }}
        validationSchema={schema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, values, handleChange }) => (
          <Form className="bg-gray-200 rounded-md w-11/12 max-w-2xl px-6 py-5 flex flex-col items-center gap-5">
            <h2 className="text-xl sm:text-3xl text-night-200 font-bold uppercase">
              Create your account
            </h2>
            <Input
              type="text"
              name="username"
              placeholder="Enter your username."
              value={values.username}
              onChange={handleChange}
            />
            <Input
              type="email"
              name="email"
              placeholder="Enter your email."
              value={values.email}
              onChange={handleChange}
            />
            <PasswordInput
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Enter your password."
              handleToggle={togglePassword}
              showPassword={showPassword}
              value={values.password}
              onChange={handleChange}
            />
            <AuthButton disabled={isSubmitting}>
              {showSpinner ? <LoadingSpinner /> : "Create Account"}
            </AuthButton>
            <div className="font-bold font-openSans text-base text-night-200 flex flex-col items-center sm:flex-row gap-2">
              <p>Already have an account ?</p>
              <Link to="/login" className="text-orange-200 hover:underline">
                Log in
              </Link>
            </div>
          </Form>
        )}
      </Formik>
    </section>
  );
}

export default Signup;

