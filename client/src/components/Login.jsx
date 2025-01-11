import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState, useContext } from "react";
import { Formik, Form } from "formik";
import { authContext } from "./AuthProvider";
import Input from "./common/Input";
import PasswordInput from "./common/PasswordInput";
import AuthButton from "./common/AuthButton";
import * as Yup from "yup";

const schema = Yup.object({
  email: Yup.string().email("Invalid email address").required("Required."),
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
  const { state } = useLocation;

  const path = state?.redirectTo || "/";

  const handleSubmit = async (values, actions) => {
    actions.setSubmitting(true);
    console.log(values);

    /* FAKE AUTHENTICATION REPLACE WITH REAL VERSION */
    await new Promise((resolve) => setTimeout(resolve, 1500));
    login();

    actions.resetForm();
    actions.setSubmitting(false);
    navigate(path);
  };

  const togglePassword = () => setShowPassword((state) => !state);

  return (
    <section className="flex-grow min-h-screen bg-zinc-200 dark:bg-night-200 flex justify-center items-center mt-10">
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={schema}
        onSubmit={handleSubmit}
      >
        <Form className="bg-gray-200 rounded-md w-11/12 max-w-2xl px-6 py-5 flex flex-col items-center gap-5">
          <h2 className="text-xl sm:text-3xl text-night-200 font-bold uppercase">
            Welcome Back
          </h2>
          <Input type="email" name="email" placeholder="Enter your email." />
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
