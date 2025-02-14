/* eslint-disable react/prop-types */
import * as React from "react";
import { useFormik } from "formik";
import { fetchAPI } from "../services/api";

export const ProductModal = (props) => {
  const [file, setFile] = React.useState();
  const [restaurants, setRestaurants] = React.useState([
    { id: 1, restaurant_name: "Restaurant 1" },
    { id: 2, restaurant_name: "Restaurant 2" },
  ]);

  function handleChange(e) {
    setFile(URL.createObjectURL(e.target.files[0]));
    formik.values.image = URL.createObjectURL(e.target.files[0]) || "";
    formik.errors.image = false;
    return formik.values.image;
  }

  const formik = useFormik({
    initialValues: {
      image: "",
      name: "",
      description: "",
      price: "",
      restaurants: "",
    },
    validate: (values) => {
      let errors = {};
      if (!values.image) errors.image = "Image is required";
      if (!values.name) errors.name = "Name is required";
      if (!values.description) errors.description = "Description is required";
      if (!values.price) errors.price = "Price is required";
      if (!values.restaurants) errors.restaurants = "Restaurant is required";
      return errors;
    },
    onSubmit: async (values) => {
      console.log("Form submitted:", values);
      const result = await fetchAPI("products", "POST", values);
      if (result) {
        alert("Product added successfully!");
        props.closeFunc();
      }
      alert("Product added successfully!");
      props.closeFunc();
    },
  });

  return (
    <div className="fixed inset-0 mt-32 bg-black w-full     bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl p-6 w-full max-w-lg shadow-lg">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Add Product</h2>
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Upload Image
            </label>
            {file && (
              <img
                src={file}
                alt="preview"
                className="mb-2 w-full h-32 object-cover rounded-lg"
              />
            )}
            <div className="flex items-center justify-center border-2 border-dashed border-gray-300 p-4 rounded-lg">
              <input
                type="file"
                id="image"
                name="image"
                onChange={handleChange}
                className="hidden"
              />
              <label
                htmlFor="image"
                className="cursor-pointer text-sm text-blue-500 hover:underline"
              >
                Select Image
              </label>
            </div>
            {formik.errors.image && (
              <p className="text-red-500 text-sm mt-1">{formik.errors.image}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Product Name"
              onChange={formik.handleChange}
              value={formik.values.name || ""}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            />
            {formik.errors.name && (
              <p className="text-red-500 text-sm mt-1">{formik.errors.name}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              placeholder="Product Description"
              onChange={formik.handleChange}
              value={formik.values.description || ""}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              rows={3}
            />
            {formik.errors.description && (
              <p className="text-red-500 text-sm mt-1">
                {formik.errors.description}
              </p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Price
            </label>
            <input
              type="number"
              id="price"
              name="price"
              placeholder="Product Price"
              onChange={formik.handleChange}
              value={formik.values.price || ""}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            />
            {formik.errors.price && (
              <p className="text-red-500 text-sm mt-1">{formik.errors.price}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Restaurant
            </label>
            <select
              id="restaurants"
              name="restaurants"
              onChange={formik.handleChange}
              value={formik.values.restaurants || ""}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select a restaurant</option>
              {restaurants.map((restaurant) => (
                <option key={restaurant.id} value={restaurant.restaurant_name}>
                  {restaurant.restaurant_name}
                </option>
              ))}
            </select>
            {formik.errors.restaurants && (
              <p className="text-red-500 text-sm mt-1">
                {formik.errors.restaurants}
              </p>
            )}
          </div>

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={props.closeFunc}
              className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200"
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};