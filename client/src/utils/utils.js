/* UTILITY FUNCTIONS TO FETCH OR POST DATA */
import axios from "axios";

export const BASE_URL = "http://127.0.0.1:8001";

export const postItemToCart = async (id, token) => {
  try {
    const res = await axios.post(
      `${BASE_URL}/restaurant/cart/add/`,
      {
        product: Number(id),
        quantity: 1,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      }
    );
    return res.data.message;
  } catch (error) {
    console.error("Error adding item to cart: ", error);
  }
};

export const getCartItems = async (token) => {
  try {
    const res = await axios.get(`${BASE_URL}/restaurant/cart/view/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    });

    const updatedCart = res.data.cart.map((item) => ({
      ...item,
      image: `${BASE_URL}/${item.image}`,
    }));

    return updatedCart;
  } catch (error) {
    console.error("Error geting the cart items: ", error);
  }
};

export const getDeliveryFee = async (token) => {
  try {
    const res = await axios.get(`${BASE_URL}/restaurant/cart/delivery-fee/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    });

    return res;
  } catch (error) {
    console.log("Error geting deleivery fee: ", error);
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
        withCredentials: true,
      }
    );
    const message = res.data.message;
    return message;
  } catch (error) {
    console.error("Error removing item from cart:", error);
  }
};

export const makeOrder = async (token, values) => {
  try {
    const res = await axios.post(
      `${BASE_URL}/restaurant/order/create/`,
      values,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      }
    );
    console.log(res);
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

export const postMessageToBot = async (token, message) => {
  try {
    const res = await axios.post(
      `${BASE_URL}/restaurant/chat/`,
      { message },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      }
    );
    return res;
  } catch (error) {
    console.error("Error posting message to chat bot: ", error);
  }
};

/* ENSURE A PHONE NUMBER STARTS WITH +254 COUNTRY CODE */
export const sanitizePhonenumber = (values) => {
  const { phone_number } = values;
  if (!phone_number.startsWith("+254")) {
    const updatedPhone = phone_number.slice(1).padStart(13, "+254");
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
