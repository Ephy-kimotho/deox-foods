// Define the base URL for the API requests
const BASE_URL = "http://localhost:8080/restaurant/api";

// 1. Get All Orders for the Restaurant Owner
const getAllOrders = async () => {
    try {
        const response = await fetch(`${BASE_URL}/orders/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`, // Assume you're storing the token in local storage
            },
        });
        const data = await response.json();
        if (response.ok) {
            return data;
        } else {
            throw new Error(data.message || "Failed to fetch orders");
        }
    } catch (error) {
        console.error("Error fetching orders:", error);
        return null;
    }
};

// 2. Update Delivery Status of an Order
const updateOrderDeliveryStatus = async (orderNo, status) => {
    try {
        const response = await fetch(`${BASE_URL}/orders/${orderNo}/update-delivery-status/`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify({ status })
        });
        const data = await response.json();
        if (response.ok) {
            return data;
        } else {
            throw new Error(data.message || "Failed to update delivery status");
        }
    } catch (error) {
        console.error("Error updating order delivery status:", error);
        return null;
    }
};

// 3. Create a New Product
const createProduct = async (productData) => {
    try {
        const response = await fetch(`${BASE_URL}/products/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify(productData),
        });
        const data = await response.json();
        if (response.ok) {
            return data;
        } else {
            throw new Error(data.message || "Failed to create product");
        }
    } catch (error) {
        console.error("Error creating product:", error);
        return null;
    }
};

// 4. Update Product Details
const updateProduct = async (productId, updatedData) => {
    try {
        const response = await fetch(`${BASE_URL}/products/${productId}/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify(updatedData),
        });
        const data = await response.json();
        if (response.ok) {
            return data;
        } else {
            throw new Error(data.message || "Failed to update product");
        }
    } catch (error) {
        console.error("Error updating product:", error);
        return null;
    }
};

// 5. Delete a Product
const deleteProduct = async (productId) => {
    try {
        const response = await fetch(`${BASE_URL}/products/${productId}/`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
        });
        if (response.ok) {
            return true;
        } else {
            const data = await response.json();
            throw new Error(data.message || "Failed to delete product");
        }
    } catch (error) {
        console.error("Error deleting product:", error);
        return false;
    }
};

// 6. Get Restaurant Info
const getRestaurantInfo = async (restaurantId) => {
    try {
        const response = await fetch(`${BASE_URL}/restaurants/${restaurantId}/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
        });
        const data = await response.json();
        if (response.ok) {
            return data;
        } else {
            throw new Error(data.message || "Failed to fetch restaurant info");
        }
    } catch (error) {
        console.error("Error fetching restaurant info:", error);
        return null;
    }
};

// 7. Update Restaurant Info
const updateRestaurantInfo = async (restaurantId, updatedData) => {
    try {
        const response = await fetch(`${BASE_URL}/restaurants/${restaurantId}/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify(updatedData),
        });
        const data = await response.json();
        if (response.ok) {
            return data;
        } else {
            throw new Error(data.message || "Failed to update restaurant info");
        }
    } catch (error) {
        console.error("Error updating restaurant info:", error);
        return null;
    }
};

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
