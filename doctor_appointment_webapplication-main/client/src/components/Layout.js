import React, { useState } from "react";
import { adminMenu, userMenu } from "./../Data/data";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Layout = ({ children }) => {
  const { user } = useSelector((state) => state.user);
  const location = useLocation();
  const navigate = useNavigate();

  // Custom notification count state
  const [notifications] = useState(user?.notification?.length || 0);

  // Logout function
  const handleLogout = () => {
    localStorage.clear();
    alert("Logout Successfully");
    navigate("/login");
  };

  // Doctor-specific menu
  const doctorMenu = [
    {
      name: "Home",
      path: "/",
      icon: "fa-solid fa-house",
    },
    {
      name: "Appointments",
      path: "/doctor-appointments",
      icon: "fa-solid fa-calendar-check",
    },
    {
      name: "Profile",
      path: `/doctor/profile/${user?._id}`,
      icon: "fa-solid fa-user-doctor",
    },
  ];

  // Render appropriate menu based on user role
  const SidebarMenu = user?.isAdmin ? adminMenu : user?.isDoctor ? doctorMenu : userMenu;

  return (
    <>
      <div
        className="main-layout"
        style={{
          display: "flex",
          minHeight: "100vh",
          backgroundColor: "#f0f2f5",
        }}
      >
        {/* Sidebar */}
        <div
          className="sidebar"
          style={{
            width: "250px",
            backgroundColor: "#001529",
            padding: "20px",
            color: "#fff",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          {/* Logo */}
          <div className="logo" style={{ textAlign: "center" }}>
            <h2 style={{ color: "#fff" }}>DOC APP</h2>
            <hr style={{ backgroundColor: "#1890ff" }} />
          </div>

          {/* Sidebar Menu */}
          <div className="menu">
            {SidebarMenu.map((menu) => {
              const isActive = location.pathname === menu.path;
              return (
                <div
                  key={menu.name}
                  className={`menu-item ${isActive ? "active" : ""}`}
                  style={{
                    padding: "10px",
                    margin: "10px 0",
                    cursor: "pointer",
                    backgroundColor: isActive ? "#1890ff" : "transparent",
                    borderRadius: "8px",
                  }}
                >
                  <i
                    className={menu.icon}
                    style={{ marginRight: "10px", color: "#fff" }}
                  ></i>
                  <Link
                    to={menu.path}
                    style={{ color: "#fff", textDecoration: "none" }}
                  >
                    {menu.name}
                  </Link>
                </div>
              );
            })}

            <div
              className="menu-item"
              onClick={handleLogout}
              style={{
                padding: "10px",
                margin: "10px 0",
                cursor: "pointer",
                backgroundColor: "#ff4d4f",
                borderRadius: "8px",
              }}
            >
              <i
                className="fa-solid fa-right-from-bracket"
                style={{ marginRight: "10px", color: "#fff" }}
              ></i>
              <span style={{ color: "#fff" }}>Logout</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="content" style={{ flex: 1 }}>
          {/* Header */}
          <div
            className="header"
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "10px 20px",
              backgroundColor: "#fff",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
            }}
          >
            <h5 style={{ color: "#001529", margin: 0 }}>Doctor Appointment System</h5>
            <div
              className="header-content"
              style={{
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
              }}
            >
              {/* Custom notification count */}
              <div
                style={{
                  position: "relative",
                  marginRight: "15px",
                  cursor: "pointer",
                }}
                onClick={() => navigate("/notification")}
              >
                <i
                  className="fa-solid fa-bell"
                  style={{ fontSize: "20px", color: "#001529" }}
                ></i>
                {notifications > 0 && (
                  <span
                    style={{
                      position: "absolute",
                      top: "-8px",
                      right: "-10px",
                      backgroundColor: "#ff4d4f",
                      borderRadius: "50%",
                      padding: "2px 6px",
                      fontSize: "12px",
                      color: "#fff",
                    }}
                  >
                    {notifications}
                  </span>
                )}
              </div>
              <Link
                to="/profile"
                style={{
                  textDecoration: "none",
                  color: "#001529",
                  fontWeight: "bold",
                }}
              >
                {user?.name}
              </Link>
            </div>
          </div>

          {/* Main Body */}
          <div
            className="body"
            style={{
              padding: "20px",
              backgroundColor: "#f0f2f5",
              minHeight: "calc(100vh - 50px)",
            }}
          >
            {children}
          </div>
        </div>
      </div>
    </>
  );
};

export default Layout;
