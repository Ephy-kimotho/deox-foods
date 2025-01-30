import { Routes, Route } from 'react-router-dom';
import DashboardLayout from './layouts/DashboardLayout';
import Products from './pages/Products';
import Categories from './pages/Categories';
import Orders from "./pages/Orders"
function AdminDashBoard() {
  return (
    <Routes>
      <Route element={<DashboardLayout />}>
        <Route path="/" element={<Products />} /> {/* Default route */}
        <Route path="/products" element={<Products />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/orders" element={<Orders />} />

      </Route>
      <Route path="*" element={<div>404 Not Found</div>} /> {/* Fallback route */}
    </Routes>
  );
}

export default AdminDashBoard;