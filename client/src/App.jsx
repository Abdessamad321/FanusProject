import React, { useState, useContext } from "react";
import "./App.css";
import Navbar from "../src/components/Navbar/NavBar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Profile from "./Pages/profile/profile.jsx";
import Footer from "../src/components/Footer/Footer";
import { Context } from "../src/components/LoginContext/LoginContext";
import RegisterPage from "./Pages/authentification/registerPage.jsx";
import HomePage from "./Pages/home/homePage.jsx";
import LoginPage from "./Pages/authentification/loginPage.jsx";
import LandingPage from "./Pages/landingPage/landing.jsx";
import FilterResults from "./Pages/FilterResults/FilterResults";
import ForgotPassword from "./components/ForgotPassword/ForgotPassword";
import ResetPassword from "./components/ForgotPassword/ResetPassword";

function App() {
  const authCtx = useContext(Context);

  return (
    <>
    {/* <Navbar/> */}
      <BrowserRouter>
        <Routes>
        <>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/create" element={<RegisterPage />} />
          <Route path="/" element={<LandingPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path= "/filterresults" element={<FilterResults />} />
          </>
          {!authCtx.token || authCtx.refToken ? (
            <>
              <Route path="/home" element={<HomePage />} />
            </>
          ) : (
            <>
              <Route path="/*" element={<Profile />} />
            </>
          )}
        <Route path="/forgetpassword" element={<ForgotPassword/>} />
        <Route path="/resetpassword/:token" element={<ResetPassword />} />
        </Routes>
        <Footer />
      </BrowserRouter> 
      {/* <ResetPasword /> */}
    </>
  );
}

export default App;


