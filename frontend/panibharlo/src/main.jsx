import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom"; // ✅ Add this
import { GoogleOAuthProvider } from "@react-oauth/google";
import "./index.css";
import "./app.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID">
      <BrowserRouter> {/* Wrap App in BrowserRouter */}
        <App />
      </BrowserRouter>
    </GoogleOAuthProvider>
  </React.StrictMode>
);





