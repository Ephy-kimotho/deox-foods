/* Place routes here */
import { createBrowserRouter } from "react-router-dom";
import Login from "../components/Login";
import Signup from "../components/Signup";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Signup />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

export default routes;
