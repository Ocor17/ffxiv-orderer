// src/Routes.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import OrderList from "./components/OrderList";
import OrderDetailPage from "./pages/OrderDetailPage";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<OrderList />} />
      <Route path="/order/:orderId" element={<OrderDetailPage />} />
    </Routes>
  );
};

const RoutesComponent = () => {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
};

export default RoutesComponent;
