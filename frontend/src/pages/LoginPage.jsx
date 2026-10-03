import axios from "axios";
import React from "react";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../context/AuthContext";

const LoginPage = () => {

    const {register,handleSubmit,formState:{errors},reset} = useForm()
    const navigate= useNavigate()

    const{setAccessToken,setUser,user} = useContext(AuthContext)

    const handleLogin = async (data)=>{
        try {
            const response  = await axios.post("/api/auth/login",data)
            setUser(response.data.data.user)
            console.log(response.data)
            setAccessToken(response.data.data.accessToken)
            navigate("/products")

        } catch (error) {
               console.log(error.response?.data)
        }

    }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit(handleLogin)} className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-6">
          Login
        </h1>

        <div className="mb-4">
          <label className="block mb-2 font-medium">
            Email
          </label>

          <input
            {...register("email")}
            type="email"
            placeholder="Enter your email"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none focus:border-blue-500"
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
            className="w-full border border-gray-300 rounded-lg px-4 py-2 outline-none focus:border-blue-500"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-semibold hover:bg-blue-700 transition cursor-pointer"
        >
          Login
        </button>

         
         <div className="mt-6 text-center">
            <p className="text-sm text-gray-500">
              Don't have an account?{" "}
              <Link
                to="/"
                className="font-semibold text-blue-600 hover:text-blue-700 hover:underline transition"
              >
                Register
              </Link>
            </p>
          </div>
      </form>
    </div>
  );
};

export default LoginPage;