import React from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
import axios from "axios";

const CreatePage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { accessToken } = useContext(AuthContext);
   
  const handleCreateProduct = async (data) => {
    try {
      console.log("Token before API:", accessToken);
      const formData = new FormData();

      formData.append("title", data.title);
      formData.append("description", data.description);

      formData.append(
        "price",
        JSON.stringify({
          amount: Number(data.price),
          currency: "INR",
        })
      );

     formData.append(
          "sizes",
          JSON.stringify(
          data.sizes
          .split(",")
          .map((size) => ({
          size: size.trim(),
          stock: 10,
         }))
        )
       );

      formData.append("images", data.image[0]);

      const response = await axios.post("/api/products", formData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      console.log(response.data);
    } catch (error) {
      console.log(error.response?.data);
        console.log("FULL ERROR:", error);
    }
}

  return (
    <div className="min-h-screen bg-gray-100 px-6 py-10">
      <div className="max-w-3xl mx-auto">

        {/* Heading */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Create Product
          </h1>

          <p className="text-gray-500 mt-2">
            Add a new product to your store.
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit(handleCreateProduct)}
          className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8"
        >

          {/* Title */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Product Title
            </label>

            <input
              {...register("title", {
                required: "Product title is required",
              })}
              type="text"
              placeholder="Enter product title"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg
              outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />

            {errors.title && (
              <p className="text-red-500 text-sm mt-1">
                {errors.title.message}
              </p>
            )}
          </div>

          {/* Description */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Description
            </label>

            <textarea
              {...register("description", {
                required: "Description is required",
              })}
              rows="5"
              placeholder="Enter product description"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg
              outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
              resize-none"
            />

            {errors.description && (
              <p className="text-red-500 text-sm mt-1">
                {errors.description.message}
              </p>
            )}
          </div>

          {/* Price */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Price
            </label>

            <input
              {...register("price", {
                required: "Price is required",
              })}
              type="number"
              placeholder="Enter price"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg
              outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />

            {errors.price && (
              <p className="text-red-500 text-sm mt-1">
                {errors.price.message}
              </p>
            )}
          </div>

          {/* Sizes */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Sizes
            </label>

            <input
              {...register("sizes")}
              type="text"
              placeholder="Example: S, M, L, XL"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg
              outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />

            <p className="text-xs text-gray-400 mt-2">
              Separate sizes with commas.
            </p>
          </div>

          {/* Image */}
          <div className="mb-8">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Product Image
            </label>

            <input
              {...register("image")}
              type="file"
              accept="image/*"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg
              bg-gray-50 cursor-pointer"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg
            font-semibold hover:bg-blue-700 transition"
          >
            Create Product
          </button>

        </form>
      </div>
    </div>
  );
};

export default CreatePage;
