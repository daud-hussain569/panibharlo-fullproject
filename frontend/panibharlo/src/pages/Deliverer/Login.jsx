import React from "react";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";

function DelivererLogin() {
  const login = useGoogleLogin({
    onSuccess: async tokenResponse => {
      try {
        const { data } = await axios.post("http://localhost:5000/api/auth/google", {
          tokenId: tokenResponse.access_token
        });
        if(data.role === "deliverer") {
          localStorage.setItem("token", data.token);
          window.location.href = "/deliverer/dashboard";
        } else {
          alert("Not authorized");
        }
      } catch (error) {
        alert("Login failed");
      }
    }
  });

  return (
    <div className="min-h-screen flex items-center justify-center">
      <button onClick={() => login()} className="bg-red-500 text-white p-4 rounded">
        Login with Google
      </button>
    </div>
  );
}

export default DelivererLogin;
