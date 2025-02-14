/* eslint-disable react/prop-types */
import deoxLogo from "/deox-foods-logo.png";

function Navbar({ restaurantName }) {
  return (
    <header className="py-2 px-5 fixed top-0 left-0 right-0 flex justify-between items-center shadow-md shadow-gray-600 bg-slate-800 ">
      <img src={deoxLogo} alt="Deox foods logo" className="w-12 h-12" />
      <p className="font-bold tracking-wider font-openSans text-2xl text-white">
        {restaurantName}
      </p>
    </header>
  );
}

export default Navbar;
