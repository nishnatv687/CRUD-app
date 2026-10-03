import React, { useContext } from "react";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";

const Navbar = () => {

   const { accessToken, setAccessToken, setUser,user } = useContext(AuthContext);
   const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      await axios.post(
        "/api/auth/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          withCredentials: true,
        }
      );

      setAccessToken(null);
      setUser(null);

      navigate("/login");
    } catch (error) {
      console.log(error.response?.data);
    }
  };

  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <Link
          to="/products"
          className="text-2xl font-bold text-gray-900"
        >
          Shop<span className="text-blue-600">Hub</span>
        </Link>

        {/* Navigation */}
        <div className="flex items-center gap-2">

          <Link
            to="/products"
            className="px-4 py-2 rounded-lg text-gray-700 font-medium
            hover:bg-blue-50 hover:text-blue-600 transition"
          >
            Home
          </Link>

         {user?.role === "seller" && (
          <Link
           to="/products/create"
           className="px-4 py-2 rounded-lg text-gray-700 font-medium
           hover:bg-blue-50 hover:text-blue-600 transition"
           >
          Create Product
          </Link>
          )}

          <button
            onClick={handleLogout}
            className="ml-3 px-5 py-2 rounded-lg bg-red-500
            text-white font-medium hover:bg-red-600 transition"
          >
            Logout
          </button>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;
