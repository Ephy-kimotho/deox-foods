/* UTILITY FUNCTIONS TO FETCH OR POST DATA */
import axios from "axios";

/* Development URL: http://127.0.0.1:8001 */
/* Production URL: https://api.deoxfoods.com */
export const BASE_URL = "https://api.deoxfoods.com";

export const postItemToCart = async (id, token) => {
  try {
    const res = await axios.post(
      `${BASE_URL}/restaurant/cart/add/`,
      {
        product: id,
        quantity: 1,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return res;
  } catch (error) {
    console.error("Error adding item to cart: ", error);
  }
};

export const getCartItems = async (token) => {
  try {
    const res = await axios.get(`${BASE_URL}/restaurant/cart_view/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    console.error(error.response.data.detail);
  }
};

export const updateCartItem = async (id, quantity, token) => {
  try {
    const res = axios.patch(
      `${BASE_URL}/restaurant/cart/update/${id}/`,
      {
        product: id,
        quantity,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res;
  } catch (error) {
    console.error("Error updating cart item: ", error);
  }
};

export const removeItemFromCart = async (id, token) => {
  try {
    const res = await axios.delete(
      `${BASE_URL}/restaurant/cart/remove/${id}/`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res;
  } catch (error) {
    console.error("Error removing item from cart:", error);
  }
};

export const makeOrder = async (token, values) => {
  try {
    const res = await axios.post(
      `${BASE_URL}/restaurant/initiate-payment/`,
      values,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return res;
  } catch (error) {
    console.error("Error making an order: ", error);
  }
};

export const getUserDetails = async (token) => {
  try {
    const res = await axios.get(`${BASE_URL}/auth/user_profile/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data;
  } catch (error) {
    console.error("Error getting user info:", error);
  }
};

export const postMessageToBot = async (message) => {
  try {
    const res = await axios.post(`${BASE_URL}/restaurant/chatbot/`, {
      message,
    });
    return res.data.response;
  } catch (error) {
    console.error("Error posting message to chat bot: ", error);
  }
};

export const getMyOrders = async (token) => {
  try {
    const res = await axios.get(`${BASE_URL}/auth/myorders/`, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  } catch (error) {
    console.error("Error geting my orders: ", error);
  }
};

export const updateDeliveryStatus = async (orderId, token) => {
  try {
    const res = await axios.patch(
      `${BASE_URL}/restaurant/update-delivery-status/${orderId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return res;
  } catch (error) {
    console.error("Error updating delivery status: ", error);
  }
};

/* ENSURE A PHONE NUMBER STARTS WITH 254 COUNTRY CODE */
export const sanitizePhonenumber = (values) => {
  const { phone_number } = values;
  if (!phone_number.startsWith("254")) {
    const updatedPhone = phone_number.slice(1).padStart(12, "254");
    return {
      ...values,
      phone_number: updatedPhone,
    };
  } else {
    return values;
  }
};

/* REMOVE EXTRA SPACES FROM AN INPUT VALUE IN THE FORM DATA */
export const sanitizeFormData = (values) => {
  const formValues = Object.entries(values);

  const sanitizedValues = formValues.reduce((acc, [name, value]) => {
    return {
      ...acc,
      [name]: value.trim(),
    };
  }, {});

  return sanitizedValues;
};
