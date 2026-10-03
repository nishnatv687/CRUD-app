import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

const ProductDetailsPage = () => {
  const { productId } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate()
  const { user,accessToken } = useContext(AuthContext);


  const handleDelete = async () => {
  try {
    const response = await axios.delete(
      `/api/products/${productId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    console.log(response.data);

    navigate("/products");
  } catch (error) {
    console.log(error.response?.data);
  }
  };

  const getProduct = async () => {
    try {
      const response = await axios.get(
        `/api/products/${productId}`
      );
      setProduct(response.data.data.product);
    } catch (error) {
      console.log(error.response?.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProduct();
  }, [productId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Loading product...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500">Product not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 px-6 py-10">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        
        <div className="grid grid-cols-1 md:grid-cols-2">
          
          {/* Image */}
          <div className="bg-gray-100 h-125">
            <img
              src={product.images?.[0]}
              alt={product.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Details */}
          <div className="p-8 md:p-12">
            <p className="text-sm text-gray-400 mb-2">
              Product Details
            </p>

            <h1 className="text-4xl font-bold text-gray-900">
              {product.title}
            </h1>

            <p className="text-3xl font-bold text-blue-600 mt-6">
              ₹{product.price?.amount}
            </p>

            <div className="mt-8">
              <h2 className="text-lg font-semibold text-gray-900">
                Description
              </h2>

              <p className="text-gray-500 leading-relaxed mt-3">
                {product.description}
              </p>
            </div>

            <div className="mt-8">
              <h2 className="text-lg font-semibold text-gray-900">
                Available Sizes
              </h2>

              <div className="flex gap-3 mt-3 flex-wrap">
                {product.sizes?.map((item, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium"
                  >
                    {item.size}
                  </span>
                ))}
              </div>
            </div>

            <button className="w-full mt-10 bg-gray-900 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition">
              Buy Product
            </button>
            {user?.role==="seller" && (
                
            <div className="flex gap-3 mt-10">
             <button
                onClick={() => navigate(`/products/${product._id}/edit`)}
               className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
             >
               Update Product
             </button>

             <button
               onClick={handleDelete}
               className="flex-1 bg-red-500 text-white py-3 rounded-lg font-semibold hover:bg-red-600 transition"
            >
             Delete Product
             </button>   
           </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;