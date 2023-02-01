import React from "react";
import { Routes, Route } from "react-router-dom";
import PrivateRoute from "../components/PrivateRoute";
import Order from "../pages/Order";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";

const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/order" element={
      <PrivateRoute><Order /></PrivateRoute>
      } />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/signin" element={<SignIn />} />
    </Routes>
  );
};

export default AllRoutes;
