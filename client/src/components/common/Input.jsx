/* eslint-disable react/prop-types */
import { useField } from "formik";
import { FaUser, FaEnvelope } from "react-icons/fa";

function Input({ type, ...props }) {
  const [fields, meta] = useField(props);
  return (
    <section className="w-full">
      <div
        className={`w-full bg-gray-100 flex ${
          meta.touched && meta.error && "border-red-100"
        } py-1 border-2 border-gray-600 rounded-md focus-within:border-black`}
      >
        <input
          type={type}
          {...fields}
          {...props}
          className="flex-grow focus:outline-none py-2 pl-3 bg-transparent text-black placeholder:text-gray-600 "
        />
        <button
          type="button"
          className="w-10 flex justify-center items-center cursor-default"
        >
          {type === "text" ? <FaUser /> : <FaEnvelope />}
        </button>
      </div>
      {meta.touched && meta.error && (
        <p className="text-red-100 pl-1 font-openSans font-bold">
          {meta.error}
        </p>
      )}
    </section>
  );
}

export default Input;
