/* eslint-disable react/prop-types */
import { useState } from "react";
import { Formik, Form } from "formik";
import Input from "./common/Input";
import Button from "./common/Button";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import useCartStore from "../stores/useCartStore";

const residentSchema = Yup.object({
  hostel: Yup.string().required("Required"),
  roomNo: Yup.number().positive().min(1).required("Required"),
});

const nonresididentSchema = Yup.object({
  plotName: Yup.string().required("Required"),
  houseNo: Yup.number().positive().min(1).required("Required"),
});

function Checkout({ closeCheckout }) {
  const [isResident, setIsResident] = useState(null);
  const navigate = useNavigate();
  const clearCart = useCartStore((state) => state.clearCart);

  const chooseResidency = (choice) => {
    setIsResident(choice);
  };

  /* REPLACE WITH REAL PAYMENT FUNCTION */
  const handlePayment = () => {
    alert("Paid successfully");
    closeCheckout();
    clearCart();
    navigate("/");
  };

  return (
    <section>
      <div className="flex flex-col justify-center items-center">
        <div className={`w-full ${isResident !== null && "hidden"}`}>
          <h3 className="font-openSans text-2xl text-night-200 text-center">
            Are you a resident student ?
          </h3>
          <div className="flex gap-6 my-2 justify-center">
            <button
              onClick={() => chooseResidency(true)}
              className="border border-gray-800 text-gray-800 bg-gray-200 py-2 px-4 rounded-lg w-24 hover:border-orange-300 hover:text-orange-300"
            >
              Yes
            </button>
            <button
              onClick={() => chooseResidency(false)}
              className="border border-gray-800 text-gray-800 bg-gray-200 py-2 px-4 rounded-lg w-24 hover:border-orange-300 hover:text-orange-300"
            >
              No
            </button>
          </div>
        </div>

        {isResident !== null && (
          <Formik
            initialValues={
              isResident
                ? { hostel: "", roomNo: "" }
                : { plotName: "", houseNo: "" }
            }
            validationSchema={isResident ? residentSchema : nonresididentSchema}
            onSubmit={handlePayment}
          >
            <Form className="w-full">
              <h5 className="font-openSans text-2xl mb-3 text-night-200 text-center font-bold">
                Enter your location
              </h5>
              {isResident ? (
                <div className=" space-y-4 mb-4">
                  <Input
                    type="text"
                    name="hostel"
                    placeholder="Enter your hostel."
                  />
                  <Input
                    type="number"
                    name="roomNo"
                    placeholder="Enter your room number."
                  />
                </div>
              ) : (
                <div className="space-y-4 mb-4">
                  <Input
                    type="text"
                    name="plotName"
                    placeholder="Enter your plot name."
                  />
                  <Input
                    type="number"
                    name="houseNo"
                    placeholder="Enter your house number."
                  />
                </div>
              )}

              <div className="flex justify-between">
                <Button
                  type="submit"
                  moreStyles="bg-green-600 hover:bg-green-800"
                >
                  Confirm Payment
                </Button>
                <Button
                  type="button"
                  moreStyles="bg-red-100 hover:bg-red-600"
                  onClick={closeCheckout}
                >
                  Cancel
                </Button>
              </div>
            </Form>
          </Formik>
        )}
      </div>
    </section>
  );
}

export default Checkout;
