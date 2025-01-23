import { useState } from "react";
import { Formik, Form } from "formik";
import PasswordInput from "./common/PasswordInput";
import AuthButton from "./common/AuthButton";
import axios from "axios";
import * as Yup from "yup";
import { sanitizeFormData } from "../utils/utils";

const schema = Yup.object({
  newPassword: Yup.string()
    .min(8, "Password must be 8 or more characters.")
    .required("Required."),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("newPassword"), null], "Passwords must match.")
    .required("Required."),
});

const ResetPassword = () => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => setShowPassword((state) => !state);

  const handleSubmit = async (values, actions) => {
    actions.setSubmitting(true);

    const updatedValues = sanitizeFormData(values); // remove whitespaces from the all values in FormData values

    try {
      const response = await axios.post("/api/reset-password", updatedValues);
      console.log("Response:", response.data);

      // Show success message or redirect user
      actions.resetForm();
    } catch (error) {
      console.error("Error resetting password:", error);
    } finally {
      actions.setSubmitting(false);
    }
  };

  return (
    <section className="flex-grow min-h-screen bg-zinc-200 dark:bg-night-200 flex justify-center items-center mt-10">
      <Formik
        initialValues={{ newPassword: "", confirmPassword: "" }}
        validationSchema={schema}
        onSubmit={handleSubmit}
      >
        <Form className="bg-gray-200 rounded-md w-4/5 max-w-2xl px-6 py-5 flex flex-col items-center gap-5">
          <h2 className="text-xl sm:text-3xl text-night-200 font-bold uppercase">
            Reset Password
          </h2>
          <PasswordInput
            type={showPassword ? "text" : "password"}
            name="newPassword"
            placeholder="Enter your new password."
            handleToggle={togglePassword}
            showPassword={showPassword}
          />
          <PasswordInput
            type={showPassword ? "text" : "password"}
            name="confirmPassword"
            placeholder="Confirm your new password."
            handleToggle={togglePassword}
            showPassword={showPassword}
          />
          <AuthButton action="sending email">Reset Password</AuthButton>
        </Form>
      </Formik>
    </section>
  );
};

export default ResetPassword;
