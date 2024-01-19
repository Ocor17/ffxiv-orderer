import React, { useEffect, useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import OrderDetailPage from "./pages/OrderDetailPage";
import HomePage from "./pages/Home";
import "./App.css";
import ErrorPage from "./pages/ErrorPage";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Forgot from "./pages/Forgot";
import { auth } from "./Firebase";
import { getUser } from "./components/Firestore";

function RequireAuth({ children }) {
  const location = useLocation();
  const [userActive, setUserActive] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userActiveData = await getUser(auth.currentUser.uid);
        setUserActive(userActiveData.active);
        //console.log("USERDATA",userActiveData)
      } catch (error) {
        console.error("Error fetching user:", error);
        setUserActive(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  //console.log("USER ACTIVE:",userActive);

  if (loading) {
    return null;
  }

  if (!auth.currentUser || !userActive) {
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }

  return children;
}

function App() {
  return (
    <>
      <head>
        <title>FFxiv inventory</title>
      </head>
      <div>
        <BrowserRouter>
          <Routes>
            <Route
              index
              element={
                <RequireAuth>
                  <HomePage />
                </RequireAuth>
              }
            />
            <Route
              path="/home"
              element={
                <RequireAuth>
                  <HomePage />
                </RequireAuth>
              }
            />
            <Route
              path="/orders/:orderId"
              element={
                <RequireAuth>
                  <OrderDetailPage />
                </RequireAuth>
              }
            />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/forgot" element={<Forgot />} />
            <Route path="*" element={<ErrorPage />} />
            {/*
    <Route path="/profile" element={<ProfilePage/>} />
    <Route path="/admin" element={<Admin/>} />
    */}
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
