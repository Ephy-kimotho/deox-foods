import { Link } from "react-router-dom";
import { useState } from "react";
import { Formik, Form } from "formik";
import Input from "./common/Input";
import PasswordInput from "./common/PasswordInput";
import AuthButton from "./common/AuthButton";
import * as Yup from "yup";

const schema = Yup.object({
  email: Yup.string().email("Invalid email address").required("Required."),
  password: Yup.string()
    .min(8, "Password must be  8 or more charaters.")
    .required("Required."),
});

function Login() {
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (values, actions) => {
    console.log("Values: ", values);

    /* REPLACE PROMISE WITH LOGIN LOGIC  */
    await new Promise((resolve) => setTimeout(resolve, 1500));
    actions.resetForm();
    actions.setSubmitting(false);
  };
  const togglePassword = () => setShowPassword((state) => !state);

  return (
    <section className="min-h-screen bg-slate-900 flex justify-center items-center">
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={schema}
        onSubmit={handleSubmit}
      >
        <Form className="bg-gray-200 rounded-md w-4/5 max-w-2xl px-6 py-5 flex flex-col items-center gap-5">
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
          <AuthButton action="logging in...">Log in</AuthButton>

          <div className="font-bold font-openSans text-base text-night-200 flex flex-col items-center sm:flex-row gap-2">
            <p>Don&apos;t have an account ?</p>
            <Link to="/" className="text-orange-200 hover:underline">
              Create one now
            </Link>
          </div>
        </Form>
      </Formik>
    </section>
  );
}

export default Login;
