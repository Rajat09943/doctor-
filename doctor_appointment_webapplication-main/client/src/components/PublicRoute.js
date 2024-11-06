import React from "react";
import { Navigate } from "react-router-dom";

const PublicRoute = ({ children }) => {
  if (localStorage.getItem('token')) {
    return <Navigate to="/" />;
  } else {
    return (
      <div
        className="public-route-container"
        style={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#f8f9fa",
        }}
      >
        <div
          className="public-route-content"
          style={{
            padding: "30px",
            backgroundColor: "#ffffff",
            borderRadius: "8px",
            boxShadow: "0px 0px 15px rgba(0, 0, 0, 0.1)",
            width: "100%",
            maxWidth: "500px",
            textAlign: "center",
          }}
        >
          {children}
        </div>
      </div>
    );
  }
};

export default PublicRoute;
