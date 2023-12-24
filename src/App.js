import React, {useEffect, useState} from 'react';
import {BrowserRouter, Routes, Route, Navigate, useLocation} from 'react-router-dom';
import OrderDetailPage from './pages/OrderDetailPage'
import HomePage from './pages/Home';
import './App.css';
import ErrorPage from './pages/ErrorPage';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Forgot from './pages/Forgot';
import {auth} from './Firebase';
import { getUser } from './components/Firestore';

const CRAFTED_BIS ={
  "MNK":"Mzk2NjAsbnVsbCwxOzM5NjYxLG51bGwsMTszOTY2MixudWxsLDE7Mzk2NjMsbnVsbCwxOzM5NjY0LG51bGwsMTszOTY4NixudWxsLDE7Mzk2OTEsbnVsbCwxOzM5Njk2LG51bGwsMTszOTcwMSxudWxsLDI7Mzk2MzEsbnVsbCwx",
  "DRG":"Mzk2NTUsbnVsbCwxOzM5NjU2LG51bGwsMTszOTY1NyxudWxsLDE7Mzk2NTgsbnVsbCwxOzM5NjU5LG51bGwsMTszOTY4NixudWxsLDE7Mzk2OTEsbnVsbCwxOzM5Njk2LG51bGwsMTszOTcwMSxudWxsLDI7Mzk2MzMsbnVsbCwx",
  "NIN":"Mzk2NzAsbnVsbCwxOzM5NjcxLG51bGwsMTszOTY3MixudWxsLDE7Mzk2NzMsbnVsbCwxOzM5Njc0LG51bGwsMTszOTY4NyxudWxsLDE7Mzk2OTIsbnVsbCwxOzM5Njk3LG51bGwsMTszOTcwMixudWxsLDI7Mzk2MzUsbnVsbCwx",
  "SAM":"Mzk2NjAsbnVsbCwxOzM5NjYxLG51bGwsMTszOTY2MixudWxsLDE7Mzk2NjMsbnVsbCwxOzM5NjY0LG51bGwsMTszOTY4NixudWxsLDE7Mzk2OTEsbnVsbCwxOzM5Njk2LG51bGwsMTszOTcwMSxudWxsLDI7Mzk2NDMsbnVsbCwx",
  "RPR":"Mzk2NTUsbnVsbCwxOzM5NjU2LG51bGwsMTszOTY1NyxudWxsLDE7Mzk2NTgsbnVsbCwxOzM5NjU5LG51bGwsMTszOTY4NixudWxsLDE7Mzk2OTEsbnVsbCwxOzM5Njk2LG51bGwsMTszOTcwMSxudWxsLDI7Mzk2NDgsbnVsbCwx",
  "BRD":"Mzk2NjUsbnVsbCwxOzM5NjY2LG51bGwsMTszOTY2NyxudWxsLDE7Mzk2NjgsbnVsbCwxOzM5NjY5LG51bGwsMTszOTY4NyxudWxsLDE7Mzk2OTIsbnVsbCwxOzM5Njk3LG51bGwsMTszOTcwMixudWxsLDI7Mzk2MzQsbnVsbCwx",
  "MCH":"Mzk2NjUsbnVsbCwxOzM5NjY2LG51bGwsMTszOTY2NyxudWxsLDE7Mzk2NjgsbnVsbCwxOzM5NjY5LG51bGwsMTszOTY4NyxudWxsLDE7Mzk2OTIsbnVsbCwxOzM5Njk3LG51bGwsMTszOTcwMixudWxsLDI7Mzk2MzcsbnVsbCwx",
  "DNC":"Mzk2NjUsbnVsbCwxOzM5NjY2LG51bGwsMTszOTY2NyxudWxsLDE7Mzk2NjgsbnVsbCwxOzM5NjY5LG51bGwsMTszOTY4NyxudWxsLDE7Mzk2OTIsbnVsbCwxOzM5Njk3LG51bGwsMTszOTcwMixudWxsLDI7Mzk2NDYsbnVsbCwx",
  "BLM":"MzkzODAsbnVsbCwxOzM5NjgxLG51bGwsMTszOTY4MixudWxsLDE7Mzk2ODMsbnVsbCwxOzM5Njg0LG51bGwsMTszOTY4OSxudWxsLDE7Mzk2OTQsbnVsbCwxOzM5Njk5LG51bGwsMTszOTcwNCxudWxsLDI7Mzk2MzksbnVsbCwx",
  "SMN":"MzkzODAsbnVsbCwxOzM5NjgxLG51bGwsMTszOTY4MixudWxsLDE7Mzk2ODMsbnVsbCwxOzM5Njg0LG51bGwsMTszOTY4OSxudWxsLDE7Mzk2OTQsbnVsbCwxOzM5Njk5LG51bGwsMTszOTcwNCxudWxsLDI7Mzk2NDAsbnVsbCwx",
  "RDM":"MzkzODAsbnVsbCwxOzM5NjgxLG51bGwsMTszOTY4MixudWxsLDE7Mzk2ODMsbnVsbCwxOzM5Njg0LG51bGwsMTszOTY4OSxudWxsLDE7Mzk2OTQsbnVsbCwxOzM5Njk5LG51bGwsMTszOTcwNCxudWxsLDI7Mzk2NDQsbnVsbCwx",
  "PLD":"Mzk2NTAsbnVsbCwxOzM5NjUxLG51bGwsMTszOTY1MixudWxsLDE7Mzk2NTMsbnVsbCwxOzM5NjU0LG51bGwsMTszOTY4NSxudWxsLDE7Mzk2OTAsbnVsbCwxOzM5Njk1LG51bGwsMTszOTcwMCxudWxsLDI7Mzk2NDksbnVsbCwxOzM5NjMwLG51bGwsMQ",
  "WAR":"Mzk2NTAsbnVsbCwxOzM5NjUxLG51bGwsMTszOTY1MixudWxsLDE7Mzk2NTMsbnVsbCwxOzM5NjU0LG51bGwsMTszOTY4NSxudWxsLDE7Mzk2OTAsbnVsbCwxOzM5Njk1LG51bGwsMTszOTcwMCxudWxsLDI7Mzk2MzIsbnVsbCwx",
  "DRK":"Mzk2NTAsbnVsbCwxOzM5NjUxLG51bGwsMTszOTY1MixudWxsLDE7Mzk2NTMsbnVsbCwxOzM5NjU0LG51bGwsMTszOTY4NSxudWxsLDE7Mzk2OTAsbnVsbCwxOzM5Njk1LG51bGwsMTszOTcwMCxudWxsLDI7Mzk2MzYsbnVsbCwx",
  "GNB":"Mzk2NTAsbnVsbCwxOzM5NjUxLG51bGwsMTszOTY1MixudWxsLDE7Mzk2NTMsbnVsbCwxOzM5NjU0LG51bGwsMTszOTY4NSxudWxsLDE7Mzk2OTAsbnVsbCwxOzM5Njk1LG51bGwsMTszOTcwMCxudWxsLDI7Mzk2NDUsbnVsbCwx",
  "WHM":"Mzk2NzUsbnVsbCwxOzM5Njc2LG51bGwsMTszOTY3NyxudWxsLDE7Mzk2NzgsbnVsbCwxOzM5Njc5LG51bGwsMTszOTY4OCxudWxsLDE7Mzk2OTMsbnVsbCwxOzM5Njk4LG51bGwsMTszOTcwMyxudWxsLDI7Mzk2MzgsbnVsbCwx",
  "SCH":"Mzk2NzUsbnVsbCwxOzM5Njc2LG51bGwsMTszOTY3NyxudWxsLDE7Mzk2NzgsbnVsbCwxOzM5Njc5LG51bGwsMTszOTY4OCxudWxsLDE7Mzk2OTMsbnVsbCwxOzM5Njk4LG51bGwsMTszOTcwMyxudWxsLDI7Mzk2NDEsbnVsbCwx",
  "AST":"Mzk2NzUsbnVsbCwxOzM5Njc2LG51bGwsMTszOTY3NyxudWxsLDE7Mzk2NzgsbnVsbCwxOzM5Njc5LG51bGwsMTszOTY4OCxudWxsLDE7Mzk2OTMsbnVsbCwxOzM5Njk4LG51bGwsMTszOTcwMyxudWxsLDI7Mzk2NDIsbnVsbCwx",
  "SGE":"Mzk2NzUsbnVsbCwxOzM5Njc2LG51bGwsMTszOTY3NyxudWxsLDE7Mzk2NzgsbnVsbCwxOzM5Njc5LG51bGwsMTszOTY4OCxudWxsLDE7Mzk2OTMsbnVsbCwxOzM5Njk4LG51bGwsMTszOTcwMyxudWxsLDI7Mzk2NDcsbnVsbCwx",
};

const BASE_URL = "https://ffxivteamcraft.com/import/";


function RequireAuth({children}){
  
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
        console.error('Error fetching user:', error);
        setUserActive(null);
      } finally{
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  //console.log("USER ACTIVE:",userActive);

  if (loading){
    return null;

  }

  if (!auth.currentUser || !userActive) {
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }


  return children;
}



function App() {

  
  return (

    <><head><title>FFxiv inventory</title></head>
    <div>
      <BrowserRouter>
        <Routes>
          <Route index element={<RequireAuth>
            <HomePage />
          </RequireAuth>} />
          <Route path="/home" element={<RequireAuth>
            <HomePage />
          </RequireAuth>} />
          <Route path="/orders/:orderId" element={<RequireAuth>
            <OrderDetailPage />
          </RequireAuth>} />
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
    </div></>
  );
}

export default App;
