const BASE_URL = "http://localhost:8080/restaurant/api";

const fetchAPI = async (endpoint, method = 'GET', body = null) => {
    try {
        const token = localStorage.getItem('token');
        if (!token) throw new Error("No authentication token found");

        const response = await fetch(`${BASE_URL}${endpoint}`, {
            method,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: body ? JSON.stringify(body) : null,
        });

        const data = await response.json();
        if (!response.ok) throw new Error(data.message || "Request failed");

        return data;
    } catch (error) {
        console.error(`Error in ${method} ${endpoint}:`, error);
        throw error;
    }
};

// API Functions
const getAllOrders = () => fetchAPI('/orders/');
const updateOrderDeliveryStatus = (orderNo, status) => fetchAPI(`/orders/${orderNo}/update-delivery-status/`, 'PATCH', { status });
const createProduct = (productData) => fetchAPI('/products/', 'POST', productData);
const updateProduct = (productId, updatedData) => fetchAPI(`/products/${productId}/`, 'PUT', updatedData);
const deleteProduct = (productId) => fetchAPI(`/products/${productId}/`, 'DELETE');
const getRestaurantInfo = (restaurantId) => fetchAPI(`/restaurants/${restaurantId}/`);
const updateRestaurantInfo = (restaurantId, updatedData) => fetchAPI(`/restaurants/${restaurantId}/`, 'PUT', updatedData);

// Exporting all functions
export {
    getAllOrders,
    updateOrderDeliveryStatus,
    createProduct,
    updateProduct,
    deleteProduct,
    getRestaurantInfo,
    updateRestaurantInfo
};
