import React from "react";
import { Routes, Route } from "react-router";
import MainLayout from "../layouts/MainLayout";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import ProductPage from "../pages/ProductPage";
import ProductDetailsPage from "../pages/ProductDetailsPage";
import CreatePage from "../pages/CreatePage";
import UpdatePage from "../pages/UpdatePage";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={<RegisterPage />} />
      
    <Route path="/products" element={<MainLayout />}>
       <Route index element={<ProductPage />} />
       <Route path=":productId" element={<ProductDetailsPage />} />
       <Route path="create" element={<CreatePage />} />
       <Route path=":productId/edit" element={<UpdatePage />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;