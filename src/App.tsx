import React, { useEffect, useState } from "react";
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
import { getUserAuthExists } from "./components/Firestore";
import ProfilePage from "./pages/Profile.tsx";
import { ThemeProvider } from "./components/theme-provider.tsx";

//reevaluate flow of this file now that create context can pass auth state
//function checks users auth status and redirects to signin if not authenticated
function RequireAuth({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    // Check if the user is authenticated when the component mounts

    const checkAuthentication = async () => {
      try {
        const userExists = await getUserAuthExists();

        if (userExists) {
          setAuthenticated(true);
        }
      } catch (error) {
        setAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuthentication();
  }, []);

  if (loading) {
    // Render loading indicator if still loading
    return <div>Loading...</div>;
  }
  if (authenticated) {
    // Render children only if authenticated
    return children;
  }

  // Redirect to sign-in page if not authenticated
  return <Navigate to="/signin" state={{ from: location }} replace />;
}

function App() {
  return (
    <>
      <ThemeProvider>
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
                path="/home/:page"
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
              <Route
                path="/profile"
                element={
                  <RequireAuth>
                    <ProfilePage />
                  </RequireAuth>
                }
              />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/forgot" element={<Forgot />} />
              <Route path="*" element={<ErrorPage />} />
              {/*
    <Route path="/admin" element={<Admin/>} />
    */}
            </Routes>
          </BrowserRouter>
        </div>
      </ThemeProvider>
    </>
  );
}

export default App;
