import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios"
import { Link, useNavigate } from "react-router";

const RegisterPage = () => {

    const {register,handleSubmit,reset,formState:{errors}} = useForm()
    const navigate = useNavigate()
    const registerHandle = async (data)=>{
       
        try {
            const response = await axios.post("/api/auth/register",data)
            console.log(response.data);
            reset()
            navigate("/login")

        } catch (error) {
            console.log(error.response?.data)
        }

    }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit(registerHandle)} className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-6">
          Create Account
        </h1>

        <div className="mb-4">
          <label className="block mb-2 font-medium">
            Name
          </label>

          <input
            {...register("name")}
            type="text"
            placeholder="Enter your name"
            className="w-full border border-gray-300 rounded-lg px-4 py-2"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2 font-medium">
            Email
          </label>

          <input
            {...register("email")}
            type="email"
            placeholder="Enter your email"
            className="w-full border border-gray-300 rounded-lg px-4 py-2"
          />
        </div>

        <div className="mb-6">
          <label className="block mb-2 font-medium">
            Password
          </label>

          <input
            {...register("password")}
            type="password"
            placeholder="Enter your password"
            className="w-full border border-gray-300 rounded-lg px-4 py-2"
          />
        </div>

      <div className="mb-4">
       <label className="block mb-2 font-medium">
          Role
       </label>

       <select
         {...register("role")}
         className="w-full border border-gray-300 rounded-lg px-4 py-2">
         <option value="">Select role</option>
         <option value="buyer">Buyer</option>
         <option value="seller">Seller</option>
        </select>
       </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-semibold hover:bg-blue-700 transition"
        >
          Register
        </button>
      <div className="mt-6 text-center">
       <p className="text-sm text-gray-500">
         Already have an account?{" "}
        <Link
           to="/login"
          className="font-semibold text-blue-600 hover:text-blue-700 hover:underline transition"
         >
         Login
       </Link>
  </p>
</div>
      </form>

    </div>
  );
};

export default RegisterPage;