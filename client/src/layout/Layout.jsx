/* place the layout component here */
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { TbMessageChatbotFilled } from "react-icons/tb";
import { Link, Outlet, useLocation } from "react-router-dom";

function Layout() {
  const { pathname } = useLocation();
  const isLocationChatBot = pathname === "/chatbot";
   return (
    <div>
      <Navbar />
      <div className="flex flex-col justify-between">
        <main className="flex relative">
          <Outlet />

          {!isLocationChatBot && (
            <Link
              to="chatbot"
              className="fixed z-40 bottom-20 right-6 w-16 h-16 grid place-items-center rounded-full  text-center p-2 bg-night-200 dark:bg-zinc-400 text-zinc-200 dark:text-night-200"
            >
              <TbMessageChatbotFilled className="text-4xl" />
            </Link>
          )}
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default Layout;
