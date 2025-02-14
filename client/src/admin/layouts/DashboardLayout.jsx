import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useToken } from "../../components/AuthProvider";
import { useLocation } from "react-router-dom";

function AdminDashBoard() {
  const { state } = useLocation();
  const { token } = useToken();

 
  return (
    <section className="w-full h-screen bg-gray-200">
      <Navbar restaurantName={state?.restaurantName} />

      {/* Main Content */}
      <main className="w-full min-h-screen mt-16 lg:mt-0 px-4 lg:px-8  p-4 lg:p-6">
        <Outlet context={{ token }} />
      </main>

      <Footer />
    </section>
  );
}
export default AdminDashBoard;