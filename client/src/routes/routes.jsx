/* Updated routes with admin dashboard integration */
import { createBrowserRouter } from "react-router-dom";
import Home from "../components/Home";
import Login from "../components/Login";
import Signup from "../components/Signup";
import Layout from "../layout/Layout";
import Cart from "../components/Cart";
import MyOrders from "../components/MyOrders";
import About from "../components/About";
import Restaurants from "../components/Restaurants";
import Contact from "../components/Contact";
import FoodItemsPage from "../components/FoodItems";
import ForgotPassword from "../components/ForgotPasword";
import Profile from "../components/Profile";
import ProtectedRoute from "../components/common/ProtectedRoute";
import Error404 from "../components/Error404";
import Meals from "../components/Meals";
import Delivery from "../components/Delivery";
import ResetPassword from "../components/ResetPassword";

const routes = createBrowserRouter(
  [
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "signup",
          element: <Signup />,
        },
        {
          path: "login",
          element: <Login />,
        },
        {
          path: "cart",
          element: (
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          ),
        },
        {
          path: "my-orders",
          element: (
            <ProtectedRoute>
              <MyOrders />
            </ProtectedRoute>
          ),
        },
        {
          path: "deliveries",
          element: <Delivery />,
        },
        {
          path: "about",
          element: <About />,
        },
        {
          path: "restaurants",
          element: <Restaurants />,
        },
        {
          path: "/restaurants/:hotelId",
          element: <FoodItemsPage />,
        },
        {
          path: "/restaurants/:hotelId/:mealId",
          element: <Meals />,
        },
        {
          path: "contact",
          element: <Contact />,
        },
        {
          path: "forgot-password",
          element: <ForgotPassword />,
        },
        {
          path: "reset-password",
          element: <ResetPassword />,
        },
        {
          path: "/profile",
          element: (
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          ),
        },
        {
          path: "*",
          element: <Error404 />,
        },
      ],
    },
  ],
  {
    future: {
      v7_skipActionErrorRevalidation: true,
      v7_partialHydration: true,
      v7_normalizeFormMethod: true,
      v7_fetcherPersist: true,
      v7_relativeSplatPath: true,
    },
  }
);

export default routes;
