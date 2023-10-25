import React, { useRef, useEffect, useState } from "react";
import "../style/reset.css";
import "../style/login-account.css";
import background from "../img/login/wave.jpeg";
import lazlogo from "../img/login/lazlogo.png";
import { ReactComponent as LoginLogo } from "../img/login/bg.svg";
import { useUserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

const Login = ({ setUserData }) => {
  const backendURL = process.env.REACT_APP_BACKEND_URL;
  const userDataJSON = sessionStorage.getItem("userData");
  const username = useRef(null);
  const password = useRef(null);
  const navigate = useNavigate();
  const { updateUser } = useUserContext();

  useEffect(() => {
    const temp = JSON.parse(userDataJSON);
    const destination =
      temp &&
      temp.role &&
      (temp.role === "WarehouseAdmin"
        ? "/warehouse"
        : temp.role === "Customer"
        ? "/product"
        : temp.role === "WarehouseWorker"
        ? "/inboundOrder"
        : "/order");
    if (temp && temp.username) {
      navigate(destination);
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    const url = backendURL + "/api/user/login";
    console.log(url);
    const requestBody = {
      username: username.current.value,
      password: password.current.value,
    };
    console.log(requestBody);
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });
    response
      .json()
      .then((data) => {
        if (response.ok) {
          if (data.data.length === 0) {
            alert("Username or password invalid!");
            throw new Error("Username or password invalid!");
          }
          const userData = {
            id: data.data[0].id,
            username: data.data[0].username,
            role: data.data[0].role,
          };
          sessionStorage.setItem("userData", JSON.stringify(userData));
          updateUser(userData);
          const destination =
            userData &&
            userData.role &&
            (userData.role === "WarehouseAdmin"
              ? "/warehouse"
              : userData.role === "Customer"
              ? "/product"
              : userData.role === "WarehouseWorker"
              ? "/inboundOrder"
              : "/order");
          navigate(destination);
        } else {
          throw new Error(data.message);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  return (
    <div className="index">
      <img className="wave" src={background} alt="background-wave" />
      <div className="container1">
        <div className="img">
          <LoginLogo />
        </div>
        <div className="login-content">
          <form action="/" method="post" className="formindex login-form">
            <img src={lazlogo} alt="logo" />
            <h2 className="title">Login</h2>
            <div className="input-div one">
              <div className="i">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-person-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3Zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                </svg>
              </div>
              <div className="div">
                <input
                  type="text"
                  className="login-input"
                  name="username"
                  placeholder="Username"
                  ref={username}
                />
              </div>
            </div>
            <div className="input-div pass">
              <div className="i">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-lock-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z" />
                </svg>
              </div>
              <div className="div">
                <input
                  type="password"
                  className="login-input"
                  name="password"
                  placeholder="Password"
                  ref={password}
                />
              </div>
            </div>
            <input
              type="submit"
              className="btn1"
              value="Login"
              onClick={(e) => handleLogin(e)}
            />

            <div className="signup_link">
              <a href="/register" className="redirect-register">
                Register now!
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
