/* eslint-disable react/prop-types */
function Button({ children, onClick, type, moreStyles }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${moreStyles} rounded-lg text-white font-openSans font-bold py-3 w-3/5 sm:w-2/6 capitalize active:scale-95 `}
    >
      {children}
    </button>
  );
}

export default Button;
