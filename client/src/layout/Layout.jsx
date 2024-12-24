/* place the layout component here */
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Layout() {
  return (
    <div>
      <Navbar />
      <div className="flex flex-col justify-between">
        <main className="flex">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default Layout;
