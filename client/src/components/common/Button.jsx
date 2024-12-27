/* eslint-disable react/prop-types */
function Button({ children, onClick }) {
  return (
    <button
      onClick={onClick}
      className="bg-orange-300 hover:bg-orange-600  rounded-lg text-white font-openSans font-bold py-3 w-3/5 sm:w-2/6"
    >
      {children}
    </button>
  );
}

export default Button;
