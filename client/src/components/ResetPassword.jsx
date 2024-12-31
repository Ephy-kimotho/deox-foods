import { useState } from "react";
import { Formik, Form } from "formik";
import Input from "./common/Input";
import PasswordInput from "./common/PasswordInput";
import AuthButton from "./common/AuthButton";
import * as Yup from "yup";
import LoadingSpinner from "./LoadingSpinner";
import axios from "axios";

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
  const [isSending, setIsSending] = useState(false);

  const togglePassword = () => setShowPassword((state) => !state);

  const handleSubmit = async (values, actions) => {
    actions.setSubmitting(true);
    setIsSending(true);

    try {
      const response = await axios.post("/api/reset-password", values);
      console.log("Response:", response.data);

      // Show success message or redirect user
      actions.resetForm();
    } catch (error) {
      console.error("Error resetting password:", error);
    } finally {
      actions.setSubmitting(false);
      setIsSending(false);
    }
  };

  return (
    <section className="flex-grow min-h-screen bg-zinc-200 dark:bg-night-200 flex justify-center items-center mt-10">
      <Formik
        initialValues={{ newPassword: "", confirmPassword: "" }}
        validationSchema={schema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, touched, errors, handleChange, handleBlur, values }) => (
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
              value={values.newPassword}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.newPassword && errors.newPassword}
            />
            <PasswordInput
              type={showPassword ? "text" : "password"}
              name="confirmPassword"
              placeholder="Confirm your new password."
              handleToggle={togglePassword}
              showPassword={showPassword}
              value={values.confirmPassword}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.confirmPassword && errors.confirmPassword}
            />
            <AuthButton disabled={isSubmitting || isSending}>
              {isSending ? (
                <div className="flex justify-center items-center">
                  <LoadingSpinner />
                </div>
              ) : (
                "Reset Password"
              )}
            </AuthButton>
          </Form>
        )}
      </Formik>
    </section>
  );
};

export default ResetPassword;

