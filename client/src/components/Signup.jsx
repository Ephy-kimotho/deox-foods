import { Formik, Form } from "formik";
import Input from "./common/Input";
import AuthButton from "./common/AuthButton";
import * as Yup from "yup";
import { Link } from "react-router-dom";

const schema = Yup.object({
  username: Yup.string()
    .min(4, "Username should be more than 4 charaters.")
    .required("Required."),
  email: Yup.string().email("Invalid email address.").required("Required."),
  password: Yup.string()
    .min(8, "Password must be  8 or more charaters.")
    .required("Required."),
});

function Signup() {
  const handleSubmit = async (values, actions) => {
    console.log("Values: ", values);

    /* REPLACE PROMISE WITH SIGN UP LOGIC */
    await new Promise((resolve) => {
      setTimeout(() => resolve(), 1500);
    });
    actions.resetForm();
    actions.setSubmitting(false);
  };

  return (
    <section className="bg-slate-900 min-h-screen flex items-center justify-center ">
      <Formik
        initialValues={{ username: "", email: "", password: "" }}
        validationSchema={schema}
        onSubmit={handleSubmit}
      >
        <Form className="bg-gray-200 rounded-md w-11/12 max-w-2xl px-6 py-5 flex flex-col items-center gap-5">
          <h2 className="text-xl sm:text-3xl text-night-200 font-bold uppercase">
            Create your account
          </h2>
          <Input
            type="text"
            name="username"
            placeholder="Enter your username."
          />

          <Input type="email" name="email" placeholder="Enter your email." />

          <Input
            type="password"
            name="password"
            placeholder="Enter your password."
          />

          <AuthButton action="creating account...">Create account</AuthButton>

          <div className="font-bold font-openSans text-base text-night-200 flex flex-col items-center sm:flex-row gap-2">
            <p>Already have an account ?</p>
            <Link to="/login" className="text-orange-200 hover:underline">
              Log in
            </Link>
          </div>
        </Form>
      </Formik>
    </section>
  );
}

export default Signup;
