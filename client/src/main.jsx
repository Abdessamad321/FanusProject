import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { AuthProvider } from "../src/Components/LoginContext/LoginContext.jsx";

// import { GoogleOAuthProvider } from '@react-oauth/google';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider >
    {/* <GoogleOAuthProvider clientId="546414162187-ug2tp7j6h2rsurp7fo64utq6flsqg92s.apps.googleusercontent.com"> */}
    <App />
    {/* </GoogleOAuthProvider> */}
    </AuthProvider>
  </React.StrictMode>,
)
