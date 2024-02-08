import { useEffect, useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import OrderDetailPage from "./pages/OrderDetailPage.tsx";
import HomePage from "./pages/Home.tsx";
import "../app/globals.css";
import ErrorPage from "./pages/ErrorPage.tsx";
import SignIn from "./pages/SignIn.tsx";
import SignUp from "./pages/SignUp.tsx";
import Forgot from "./pages/Forgot.tsx";
import { auth } from "./Firebase";
import { getUser } from "./components/Firestore";

//reevaluate flow of this file now that create context can pass auth state

function RequireAuth({ children }: { children: JSX.Element }) {
  const location = useLocation();
  const [userActive, setUserActive] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userActiveData = await getUser(auth?.currentUser?.uid);
        setUserActive(userActiveData?.active);
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

  console.log("Children:", children);
  return children;
}

function App() {
  //check if user is already authenticated and skip login

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [redirectHome, setRedirectHome] = useState(false);
  console.log("redirectHome", redirectHome);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const unsubscribe = auth.onAuthStateChanged((user: any) => {
      if (user) {
        console.log("User is signed in");
        setRedirectHome(true);
      } else {
        console.log("User is signed out");
      }
    });

    return () => unsubscribe();
  }, []);

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
