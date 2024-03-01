import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

export const Context = createContext({
  token: "",
  refToken: "",
  // decodedToken: null,
  customerImage: null,
  login: (access, refresh) => {},
  logout: () => {},
  setCustomerImage: (image) => {},
});

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [authToken, setAuthToken] = useState(localStorage.getItem("token") || null);
  const [refToken, setRefToken] = useState(localStorage.getItem("refreshToken") || null);
  // const [decodedToken, setDecodedToken] = useState(null);
  const [customerImage, setCustomerImage] = useState(null);

  const loginHandler = (access, refresh) => {
    setIsLoggedIn(true);
    setAuthToken(access);
    setRefToken(refresh);
    localStorage.setItem("token", access);
    localStorage.setItem("refreshToken", refresh);
  };

  const logoutHandler = () => {
    setIsLoggedIn(false);
    setAuthToken(null);
    setRefToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
  };

  const setCustomerImageHandler = (image) => {
    setCustomerImage(image);
  };

  const refreshAccessToken = async () => {
    try {
      if (refToken) {
        const decodedRefreshToken = decodeJwt(refToken);
        const currentTime = Date.now() / 1000;

        if (currentTime <= decodedRefreshToken.exp) {
          const config = {
            headers: {
              Authorization: `Bearer ${refToken}`,
            },
          };
          const response = await axios.post("http://localhost:7000/customer/refresh/token", {}, config);

          const { access_token } = response.data;
          setAuthToken(access_token);
          localStorage.setItem("token", access_token);
        } else {
          logoutHandler();
          return;
        }
      }
    } catch (error) {
      console.error("Error refreshing token:", error);
      logoutHandler();
    }
  };

  useEffect(() => {
    const checkAuthentication = async () => {
      if (authToken) {
        const decoded = decodeJwt(authToken);
        const currentTime = Date.now() / 1000;
        if (decoded.exp && currentTime > decoded.exp) {
          await refreshAccessToken();
        } else {
          // setDecodedToken(decoded);
          loginHandler(authToken, refToken);
          const storedCustomerid = localStorage.getItem("customerId");
          try {
            const response = await axios.get(`http://localhost:7000/customer/${storedCustomerid}`);
            const customerData = response.data;
            // console.log(customerData);
            setCustomerImage(customerData.customer_photo || null);
          } catch (error) {
            console.error("Error fetching user image:", error);
          }
        }
      } else {
        logoutHandler();
      }
    };
  
    checkAuthentication()
  }, [authToken, refToken]);

  return (
    <Context.Provider
      value={{
        isLoggedIn,
        token: authToken,
        refresh: refToken,
        // decodedToken: decodedToken,
        customerImage: customerImage,
        login: loginHandler,
        logout: logoutHandler,
        setCustomerImage: setCustomerImageHandler,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useAuth = () => {
  return useContext(Context);
};

function decodeJwt(token) {
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );

  return JSON.parse(jsonPayload);
}