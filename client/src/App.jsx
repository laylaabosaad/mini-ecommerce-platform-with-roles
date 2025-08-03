import { useState } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Login from "../auth/Login";
import Register from "../auth/Register";
import PublicOnlyRoute from "../context/PublicOnlyRoute";
import Home from "./pages/Home";
import SingleProduct from "./pages/SingleProduct";
import Navbar from "./components/Navbar/Navbar";

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
        <Route path="/" element={<Home />} />
      </Routes>
    </>
  );
}

export default App;
