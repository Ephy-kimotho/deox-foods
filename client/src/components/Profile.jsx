import { FaUserCircle } from "react-icons/fa";
import { IoLogOutOutline } from "react-icons/io5";
import { useToken } from "./AuthProvider";

function Profile() {
  const { setToken } = useToken();

  const signout = () => {
    setToken("");
  };

  return (
    <section className="flex-grow min-h-screen bg-zinc-200 dark:bg-night-200 px-4 font-sans relative">
      <div className="mt-28 flex flex-col gap-2 items-center ">
        <FaUserCircle className="text-2xl sm:text-4xl md:text-8xl dark:text-gray-200" />
        <p className="text-lg text-night-200 dark:text-gray-200 font-bold">
          Hello John Doe
        </p>
      </div>

      <div className="mt-4 max-w-lg space-y-8  mx-auto p-4">
        <p className="border-b-2 border-gray-800 dark:text-gray-200">
          <span className="font-bold">Username: &nbsp;</span>John Doe
        </p>
        <p className="border-b-2 border-gray-800 dark:text-gray-200">
          <span className="font-bold">Email: &nbsp;</span>john@gmail.com
        </p>
      </div>

      <footer className="absolute bottom-0 left-0 right-0 py-2 px-3 grid place-items-center">
        <button
          onClick={signout}
          className="flex items-center text-gray-200 gap-2 py-3 px-4 rounded-md active:scale-95 bg-night-200  mb-3 dark:bg-white dark:text-night-200"
        >
          <IoLogOutOutline className="text-xl sm:text-2xl" />
          Log out
        </button>
      </footer>
    </section>
  );
}

export default Profile;
