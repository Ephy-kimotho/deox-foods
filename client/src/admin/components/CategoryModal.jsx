import * as React from "react";
import { useFormik } from "formik";

export const CategoryModal = (props) => {
  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
    },
    validate: (values) => {
      let errors = {};
      if (!values.name) {
        errors.name = "Category name is required";
      }
      if (!values.description) {
        errors.description = "Category description is required";
      }
      return errors;
    },
    onSubmit: async (values) => {
      // Mock function to handle form submission
      const result = await fetchAPI("categories", "POST", values);
      if (result) {
        alert("Category added successfully!");
        props.closeFunc();
      }
      console.log("Category submitted:", values);
      alert("Category added successfully!");
      props.closeFunc();
    },
  });

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">
              Category Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter category name"
              onChange={formik.handleChange}
              value={formik.values.name || ""}
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
            {formik.errors.name && (
              <p className="text-red-500 text-sm mt-1">{formik.errors.name}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">
              Category Description
            </label>
            <textarea
              id="description"
              name="description"
              placeholder="Enter category description"
              onChange={formik.handleChange}
              value={formik.values.description || ""}
              className="w-full p-2 border border-gray-300 rounded-lg"
              rows={4}
            />
            {formik.errors.description && (
              <p className="text-red-500 text-sm mt-1">
                {formik.errors.description}
              </p>
            )}
          </div>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={props.closeFunc}
              className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
            >
              Add Category
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};