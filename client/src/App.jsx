import { RouterProvider } from "react-router-dom";
import routes from "./routes/routes";
import AuthProvider from "./components/AuthProvider";

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={routes} future={{ v7_startTransition: true }} />
    </AuthProvider>
  );
}
export default App;
