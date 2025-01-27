/* eslint-disable react/prop-types */
import { useState } from "react";
import { Formik, Form } from "formik";
import Input from "./common/Input";
import Button from "./common/Button";
//import { useNavigate } from "react-router-dom";
import { useToken } from "./AuthProvider";
import {
  makeOrder,
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
  const [isResident, setIsResident] = useState(null);
  //const navigate = useNavigate();
  const { token } = useToken();

  const chooseResidency = (choice) => {
    setIsResident(choice);
  };

  /* REPLACE WITH REAL PAYMENT FUNCTION */
  const handlePayment = async (values, action) => {
    try {
      let updatedValues = sanitizeFormData(values); // sanitizeFormData  will remove whitespaces from all input values

      updatedValues = sanitizePhonenumber(updatedValues); // sanitize phone number will ensure phone number starts with +254

      makeOrder(token, updatedValues);
      action.resetForm();
     // navigate("/")
      closeCheckout();
    } catch (error) {
      console.error("Error:", error);
    }
    //navigate("/");
  };

  return (
    <section>
      <div className="flex flex-col justify-center items-center">
        <div className={` ${isResident !== null && "hidden"}`}>
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
              {isResident ? (
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
              ) : (
                <div className="space-y-4 mb-4">
                  <Input
                    type="text"
                    name="hostel_name"
                    placeholder="Choose between gate or njokerio"
                  />
                  <Input
                    type="text"
                    name="block_number"
                    placeholder="Enter your plot name."
                  />
                  <Input
                    type="text"
                    name="room_number"
                    placeholder="Enter your house number."
                  />
                  <Input
                    type="text"
                    name="phone_number"
                    placeholder="Enter your phone number."
                  />
                </div>
              )}

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
        )}
      </div>
    </section>
  );
}

export default Checkout;
