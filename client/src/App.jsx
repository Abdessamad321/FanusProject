import React, { useState, useContext } from "react";
import "./App.css";
import Navbar from "./Components/Navbar/NavBar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Profile from "./Pages/profile/profile.jsx";
import Footer from "./Components/Footer/Footer";
import { Context } from "./Components/LoginContext/LoginContext.jsx";
import RegisterPage from "./Pages/authentification/registerPage.jsx";
import HomePage from "./Pages/home/homePage.jsx";
import LoginPage from "./Pages/authentification/loginPage.jsx";
import LandingPage from "./Pages/landingPage/landing.jsx";
import Deletion from "./Components/menu/security/deletion.jsx";
import ProductDetail from './Components/oussama/ProductDetail.jsx';

import ProductDetails from './Pages/productDetails/productDetails.jsx'
function App() {
  const authCtx = useContext(Context);

  return (
    <>
    {/* <ProductDetails/> */}
      <BrowserRouter>
        <Navbar />
        <Routes>
        <>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/create" element={<RegisterPage />} />
          <Route path="/" element={<LandingPage />} />
          <Route path="/home" element={<HomePage />} />
          </>
          {!authCtx.token || authCtx.refToken ? (
            <>
              <Route path="/home" element={<HomePage />} />
            </>
          ) : (
            <>
              <Route path="/*" element={<Profile />} />
              <Route path="/delete" element={<Deletion />}/>
              <Route path="/event-detail/:eventId" element={<ProductDetail/>}/>
            </>
          )}
        </Routes>
        <Footer />
      </BrowserRouter> 
    </>
  );
  
}

export default App;


