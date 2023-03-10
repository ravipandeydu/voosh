import React from "react";
import { Routes, Route } from "react-router-dom";
import PrivateRoute from "../components/PrivateRoute";
import AddOrder from "../pages/AddOrder";
import Home from "../pages/Home";
import Order from "../pages/Order";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";

const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route
        path="/addorder"
        element={
          <PrivateRoute>
            <AddOrder />
          </PrivateRoute>
        }
      />
      <Route
        path="/order"
        element={
          <PrivateRoute>
            <Order />
          </PrivateRoute>
        }
      />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/signin" element={<SignIn />} />
    </Routes>
  );
};

export default AllRoutes;
