/* eslint-disable react/prop-types */
import { useState } from "react";
import { Formik, Form } from "formik";
import Input from "./common/Input";
import Button from "./common/Button";
import { useNavigate } from "react-router-dom";
import { useToken } from "./AuthProvider";
import { useCart } from "./CartProvider";
//import toast from "react-hot-toast";
import {
  makeOrder,
  getCartItems,
  sanitizeFormData,
  sanitizePhonenumber,
} from "../utils/utils";
import * as Yup from "yup";

const schema = Yup.object({
  hostel_name: Yup.string().required("Required"),
  block_number: Yup.string().required("Required"),
  room_number: Yup.string().required("Required"),
  phone_number: Yup.string().required("Required"),
});

function Checkout({ closeCheckout }) {
  const [orderId, setOrderId] = useState("");
  const { setCart } = useCart();
  const navigate = useNavigate();
  const { token } = useToken();


  /* REPLACE WITH REAL PAYMENT FUNCTION */
  const handlePayment = async (values, action) => {
    try {
      let updatedValues = sanitizeFormData(values); // sanitizeFormData  will remove whitespaces from all input values

      updatedValues = sanitizePhonenumber(updatedValues); // sanitize phone number will ensure phone number starts with +254

      const res = await makeOrder(token, updatedValues);
      console.log(res);
      setOrderId(res.data.order_number);
      //toast.success(res.data.message);
      action.resetForm();

      const cartItems = await getCartItems(token);
      setCart(cartItems);

      navigate("/my-orders", { state: { orderId } });
      closeCheckout();
    } catch (error) {
      console.error("Error:", error);
    }
    //navigate("/");
  };

  return (
    <section>
      <div className="flex flex-col justify-center items-center">
        <Formik
          initialValues={{
            hostel_name: "",
            block_number: "",
            room_number: "",
            phone_number: "",
          }}
          validationSchema={schema}
          onSubmit={handlePayment}
        >
          <Form className="w-full">
            <h5 className="font-openSans text-2xl mb-3 text-night-200 text-center font-bold">
              Enter your location
            </h5>
            <div className=" space-y-4 mb-4">
              <Input
                type="text"
                name="hostel_name"
                placeholder="Enter your hostel."
              />
              <Input
                type="text"
                name="block_number"
                placeholder="Enter your hostel floor."
              />
              <Input
                type="text"
                name="room_number"
                placeholder="Enter your room number."
              />

              <Input
                type="text"
                name="phone_number"
                placeholder="Enter your phone number."
              />
            </div>

            <div className="flex justify-between gap-5 sm:gap-0">
              <Button
                type="submit"
                moreStyles="bg-green-600 hover:bg-green-800 px-3 sm:px-12"
              >
                Confirm Payment
              </Button>
              <Button
                type="button"
                moreStyles="bg-red-100 hover:bg-red-600 px-6 sm:px-12"
                onClick={closeCheckout}
              >
                Cancel
              </Button>
            </div>
          </Form>
        </Formik>
      </div>
    </section>
  );
}

export default Checkout;
