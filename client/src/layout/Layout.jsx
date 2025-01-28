import { TbMessageChatbotFilled } from "react-icons/tb";
import { IoClose } from "react-icons/io5";
import { Outlet } from "react-router-dom";
import { useState } from "react";
import { Toaster } from "react-hot-toast";
import { useToken } from "../components/AuthProvider";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import Chatbot from "../components/Chatbot";

function Layout() {
  const [isVisible, setIsVisible] = useState(false);
  const { token } = useToken();

    const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    <div>
      <Navbar />
      <div className="flex flex-col justify-between">
        <Toaster position="top-center" />
        <main className="flex relative">
          <Outlet />

          {/* Chatbot Component */}

          <Chatbot isVisible={isVisible} toggleVisibility={toggleVisibility} />

          {/*Chatbot  Toggle Button */}

          {token && (
            <button
              type="button"
              onClick={toggleVisibility}
              className={`fixed z-40 bottom-6 right-6 w-12 h-12 grid place-items-center rounded-full p-2 bg-night-200 dark:bg-zinc-400 text-zinc-200 dark:text-night-200`}
            >
              {isVisible ? (
                <IoClose className="text-3xl" />
              ) : (
                <TbMessageChatbotFilled className="text-3xl" />
              )}
            </button>
          )}
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default Layout;
