import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import { AuthContext } from "../context/AuthContext";

const UpdatePage = () => {
  const { productId } = useParams();
  const navigate = useNavigate();

  const { accessToken } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [loading, setLoading] = useState(true);

  // Get existing product
  const getProduct = async () => {
    try {
      const response = await axios.get(
        `/api/products/${productId}`
      );
      const product = response.data.data.product;

      reset({
        title: product.title,
        description: product.description,
        price: product.price.amount,
        sizes: product.sizes
          .map((item) => item.size)
          .join(", "),
      });
    } catch (error) {
      console.log(error.response?.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProduct();
  }, [productId]);

  // Update product
  const handleUpdate = async (data) => {
    try {
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

      // Only send image if user selected a new one
      if (data.image?.[0]) {
        formData.append("images", data.image[0]);
      }

      const response = await axios.put(
        `/api/products/${productId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      console.log(response.data);

      navigate(`/products/${productId}`);
    } catch (error) {
      console.log(error.response?.data);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Loading product...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 px-6 py-10">
      <div className="max-w-3xl mx-auto">

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
          
          <div className="mb-8">
            <p className="text-sm text-blue-600 font-semibold">
              PRODUCT MANAGEMENT
            </p>

            <h1 className="text-3xl font-bold text-gray-900 mt-2">
              Update Product
            </h1>

            <p className="text-gray-500 mt-2">
              Update the information of your product.
            </p>
          </div>

          <form
            onSubmit={handleSubmit(handleUpdate)}
            className="space-y-6"
          >

            {/* Title */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Product Title
              </label>

              <input
                {...register("title", {
                  required: "Title is required",
                })}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-blue-500"
                placeholder="Enter product title"
              />

              {errors.title && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.title.message}
                </p>
              )}
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Description
              </label>

              <textarea
                {...register("description", {
                  required: "Description is required",
                })}
                rows="5"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-blue-500 resize-none"
                placeholder="Enter product description"
              />

              {errors.description && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.description.message}
                </p>
              )}
            </div>

            {/* Price */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Price
              </label>

              <input
                type="number"
                {...register("price", {
                  required: "Price is required",
                })}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-blue-500"
                placeholder="Enter price"
              />

              {errors.price && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.price.message}
                </p>
              )}
            </div>

            {/* Sizes */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Sizes
              </label>

              <input
                {...register("sizes", {
                  required: "Sizes are required",
                })}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-blue-500"
                placeholder="S, M, L, XL"
              />

              {errors.sizes && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.sizes.message}
                </p>
              )}

              <p className="text-xs text-gray-400 mt-2">
                Separate sizes using commas.
              </p>
            </div>

            {/* Image */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                New Product Image
              </label>

              <input
                type="file"
                accept="image/*"
                {...register("image")}
                className="w-full border border-gray-300 rounded-lg px-4 py-3"
              />

              <p className="text-xs text-gray-400 mt-2">
                Leave empty if you don't want to change the image.
              </p>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-gray-900 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition"
            >
              Update Product
            </button>

          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdatePage;