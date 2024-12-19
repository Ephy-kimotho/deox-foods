/* eslint-disable react/prop-types */
import { useField } from "formik";

function Input({ type, ...props }) {
  const [fields, meta] = useField(props);
  return (
    <div className="w-full">
      <input
        type={type}
        {...fields}
        {...props}
        className={`py-2 pl-3 bg-gray-100 border-2 border-gray-600 text-black rounded-md  ${
          meta.touched && meta.error && "border-none outline outline-red-100"
        } placeholder:text-gray-600 w-full`}
      />
      {meta.touched && meta.error && (
        <p className="text-red-100 font-openSans font-bold">{meta.error}</p>
      )}
    </div>
  );
}

export default Input;
