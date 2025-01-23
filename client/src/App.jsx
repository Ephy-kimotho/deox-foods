import { RouterProvider } from "react-router-dom";
import routes from "./routes/routes";
import AuthProvider from "./components/AuthProvider";
import CartProvider from "./components/CartProvider";

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <RouterProvider router={routes} future={{ v7_startTransition: true }} />
      </CartProvider>
    </AuthProvider>
  );
}
export default App;
