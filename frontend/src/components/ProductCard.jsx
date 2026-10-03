import React from "react";
import { useNavigate } from "react-router";

const ProductCard = ({ product }) => {

    const navigate = useNavigate()

  return (
    <div className="group bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300">

      {/* Image */}
      <div onClick={()=>navigate(`/products/${product._id}`)} className="relative h-60 bg-gray-100 overflow-hidden">
        <img
          src={product.images?.[0]}
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Category / Badge */}
        <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-gray-800 text-xs font-semibold px-3 py-1.5 rounded-full shadow-sm">
          Product
        </span>
      </div>

      {/* Content */}
      <div className="p-5">

        <h2 className="text-lg font-bold text-gray-900 truncate">
          {product.title}
        </h2>

        <p className="text-sm text-gray-500 mt-2 line-clamp-2 leading-relaxed">
          {product.description}
        </p>

        {/* Bottom Section */}
        <div className="flex items-center justify-between mt-5">

          <div>
            <p className="text-xs text-gray-400">
              Price
            </p>

            <span className="text-xl font-bold text-gray-900">
              ₹{product.price.amount}
            </span>
          </div>

          <button
            className="px-4 py-2.5 bg-gray-900 text-white text-sm font-semibold
            rounded-lg hover:bg-blue-600 transition-colors duration-300"
          >
            View Details
          </button>

        </div>

      </div>
    </div>
  );
};

export default ProductCard;
