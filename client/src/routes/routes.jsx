/* Place routes here */
import { createBrowserRouter } from "react-router-dom";
import Home from "../components/Home";
import Login from "../components/Login";
import Signup from "../components/Signup";
import Layout from "../layout/Layout";
import Cart from "../components/Cart";
import MyOrders from "../components/MyOrders";
import About from "../components/About";
import Restaurants from "../components/Restaurants";
import Fruits from "../components/Fruits";
import Contact from "../components/Contact";
import ChatbotLayout from "../components/chatbot/layout/page";
import FoodItemsPage from "../components/FoodItems";

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
          element: <Cart />,
        },
        {
          path: "my-orders",
          element: <MyOrders />,
        },
        {
          path: "about",
          element: <About />,
        },
        {
          path: "restraunts",
          element: <Restaurants />,
        },
        {
          path: "fruits",
          element: <Fruits />,
        },
        {
          path: "food-menu/:hotelid",
          element: <FoodItemsPage />,
        },
        {
          path: "contact",
          element: <Contact />,
        },
        {
          path: "chatbot",
          element: <ChatbotLayout />,
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
