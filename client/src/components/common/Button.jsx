/* eslint-disable react/prop-types */
function Button({ children, moreStyles, ...props }) {
  return (
    <button
      {...props}
      className={`${moreStyles} rounded-lg text-white font-openSans font-bold py-3 capitalize active:scale-95 `}
    >
      {children}
    </button>
  );
}

export default Button;
