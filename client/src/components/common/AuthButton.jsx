/* eslint-disable react/prop-types */
import { useFormikContext } from "formik";

function AuthButton({ action, children }) {
  const { isSubmitting } = useFormikContext();
  return (
    <div className="mt-2 w-full text-center">
      <button
        type="submit"
        disabled={isSubmitting}
        className={`border-none font-bold py-2 w-5/6 sm:w-3/6 bg-orange-300 text-white font-montserrat hover:bg-orange-600 rounded ${
          isSubmitting && "disabled:bg-gray-500 disabled:cursor-not-allowed"
        } active:scale-95 tracking-wide text-lg sm:text-xl`}
      >
        {isSubmitting ? action : children}
      </button>
    </div>
  );
}
export default AuthButton;
