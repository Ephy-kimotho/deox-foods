import { BASE_URL } from "../../utils/utils";

export const fetchAPI = async (endpoint, method = 'GET', body = null, token) => {
    try {
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

// http://127.0.0.1:8000/restaurant/restaurant/1/products/
// API Functions
const getAllResturants = (token) => fetchAPI('/restaurant/restaurants/', 'GET', null, token);


const getAllOrders = (token) => fetchAPI('/restaurant/paid-orders/', 'GET', null, token);
const getAllProducts = (token, id) => fetchAPI(`/restaurant/restaurant/${id}/products/`, 'GET', null, token);

const updateOrderDeliveryStatus = (orderNo, status, token) => 
    fetchAPI(`/orders/${orderNo}/update-delivery-status/`, 'PATCH', { status }, token);

const createProduct = (productData, token) => 
    fetchAPI('/products/', 'POST', productData, token);

const updateProduct = (productId, updatedData, token) => 
    fetchAPI(`/products/${productId}/`, 'PUT', updatedData, token);

const deleteProduct = (productId, token) => 
    fetchAPI(`/products/${productId}/`, 'DELETE', null, token);

const getRestaurantInfo = (restaurantId, token) => 
    fetchAPI(`/restaurants/${restaurantId}/`, 'GET', null, token);

const updateRestaurantInfo = (restaurantId, updatedData, token) => 
    fetchAPI(`/restaurants/${restaurantId}/`, 'PUT', updatedData, token);

// Exporting all functions
export {
    getAllResturants,
    getAllOrders,
    updateOrderDeliveryStatus,
    createProduct,
    updateProduct,
    deleteProduct,
    getRestaurantInfo,
    updateRestaurantInfo,
    getAllProducts
};

