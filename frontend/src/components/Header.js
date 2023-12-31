import React, { useState, useEffect } from "react";
import logo from "../img/login/lazlogo2.png";
import "../style/header.css";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const userDataJSON = sessionStorage.getItem("userData");
  const [currentUserData, setCurrentUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (userDataJSON) {
      setCurrentUserData(JSON.parse(userDataJSON));
    }
  }, []);

  const handleLogOut = () => {
    sessionStorage.removeItem("userData");
    navigate("/login");
  };

  const handleClose = (id) => {
    const formOuter = document.getElementById(id);
    if (!formOuter) return;
    formOuter.style.visibility =
      formOuter.style.visibility === "hidden" ? "visible" : "hidden";
    formOuter.style.opacity = formOuter.style.opacity === "0" ? "1" : "0";
  };

  return (
    <>
      {currentUserData && (
        <header>
          <img src={logo} alt="Logo" />
          <nav>
            <li>Home</li>
            {currentUserData && currentUserData.role === "WarehouseAdmin" && (
              <li onClick={() => navigate("/warehouse")}>Warehouse</li>
            )}
            {currentUserData &&
              (currentUserData.role === "Seller" ||
                currentUserData.role === "Customer") && (
                <li onClick={() => navigate("/product")}>Product</li>
              )}
            {currentUserData &&
              (currentUserData.role === "Seller" ||
                currentUserData.role === "WarehouseWorker") && (
                <li onClick={() => navigate("/inboundOrder")}>Inbound Order</li>
              )}
            {currentUserData && currentUserData.role === "WarehouseAdmin" && (
              <li onClick={() => navigate("/category")}>Category</li>
            )}
            {currentUserData &&
              (currentUserData.role === "WarehouseWorker" ||
                currentUserData.role === "Shipper" ||
                currentUserData.role === "Customer") && (
                <li onClick={() => navigate("/order")}>Order</li>
              )}
            <li>About Us</li>
          </nav>
          <div className="right">
            {currentUserData && currentUserData.role === "Customer" && (
              <svg
                onClick={() => navigate("/cart")}
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                class="bi bi-cart"
                viewBox="0 0 16 16"
              >
                <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
              </svg>
            )}
            <svg
              onClick={() => handleClose("toggleBox")}
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="25"
              fill="currentColor"
              class="bi bi-list"
              viewBox="0 0 16 16"
              style={{ transform: "translateY(1px)" }}
            >
              <path
                fill-rule="evenodd"
                d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
              />
            </svg>
          </div>
          <div id="toggleBox" style={{ visibility: "hidden", opacity: "0" }}>
            <div className="userInfo">
              {`Hello, `}
              <div className="username">
                {currentUserData && currentUserData.username
                  ? currentUserData.username
                  : ""}
              </div>
            </div>
            <div className="logOutBtn" onClick={handleLogOut}>
              Log Out
            </div>
          </div>
        </header>
      )}
    </>
  );
};

export default Header;
