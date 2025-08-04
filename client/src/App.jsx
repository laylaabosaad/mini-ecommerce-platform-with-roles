import { useState } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Login from "../auth/Login";
import Register from "../auth/Register";
import PublicOnlyRoute from "../context/PublicOnlyRoute";
import Home from "./pages/Home";
import SingleProduct from "./pages/SingleProduct";
import Navbar from "./components/Navbar/Navbar";
import ProductsPerCategory from "./pages/ProductsPerCategory";
import Stats from "../dashboard/stats/Stats";
import Footer from "./components/Footer";
import ProtectedRoutes from "../context/ProtectedRoutes";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route
          path="/login"
          element={
            <PublicOnlyRoute>
              <Login />
            </PublicOnlyRoute>
          }
        />

        <Route
          path="/register"
          element={
            <PublicOnlyRoute>
              <Register />
            </PublicOnlyRoute>
          }
        />

        <Route path="/products/:id" element={<SingleProduct />} />
        <Route
          path="/products/category/:categoryId"
          element={<ProductsPerCategory />}
        />
        <Route path="/" element={<Home />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoutes roles={["admin"]}>
              <Stats />
            </ProtectedRoutes>
          }
        />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
