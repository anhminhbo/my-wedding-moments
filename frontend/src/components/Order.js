import React, { useState, useEffect } from "react";
import "../style/table.css";
import "../style/order.css";
import Header from "../components/Header";

const Order = () => {
  const backendURL = process.env.REACT_APP_BACKEND_URL;
  const userDataJSON = sessionStorage.getItem("userData");
  const [currentUserData, setCurrentUserData] = useState(null);
  const [orders, setOrders] = useState([]);
  const [userOrders, UO] = useState([]);

  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    const day = date.getDate().toString().padStart(2, "0"); // Get the day and pad with leading 0 if necessary
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Get the month (months are 0-based) and pad with leading 0 if necessary
    const year = date.getFullYear();

    return `${day}/${month}/${year}, ${date.toLocaleTimeString()}`;
  };

  useEffect(() => {
    if (userDataJSON) {
      setCurrentUserData(JSON.parse(userDataJSON));
    }
    const url = backendURL + "/api/order/getAllOrders";
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Connection error!");
        }
        return response.json();
      })
      .then((data) => {
        setOrders(data.data);
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  }, []);

  useEffect(() => {
    const temp = orders.filter(
      (order) => order.customer_id === currentUserData.id
    );
    UO(temp);
  }, [orders, currentUserData]);

  const handleAccept = async (id) => {
    const url = backendURL + "/api/order/acceptOrder";
    const data = {
      orderId: id,
    };
    const response = await fetch(url, {
      method: "POST", // Use PUT for updating
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    response
      .json()
      .then((data) => {
        if (response.ok) {
          alert(`Order successfully accepted!`);
          window.location.reload();
        } else {
          throw new Error(data.errMessage);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleReject = async (id) => {
    const url = backendURL + "/api/order/rejectOrder";
    const data = {
      orderId: id,
    };
    const response = await fetch(url, {
      method: "POST", // Use PUT for updating
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    response
      .json()
      .then((data) => {
        if (response.ok) {
          alert(`Order successfully rejected!`);
          window.location.reload();
        } else {
          throw new Error(data.errMessage);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <>
      {userDataJSON && <Header />}
      {currentUserData &&
        (currentUserData.role === "WarehouseWorker" ||
          currentUserData.role === "Shipper") && (
          <div className="displayContainer">
            <div className="displayTitle">Order</div>
            <table id="productList" class="displayTable">
              <thead>
                <tr>
                  <th>Customer ID</th>
                  <th>Order Date</th>
                  <th>Order Status</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id}>
                    <td>{order.customer_id}</td>
                    <td>{formatDate(order.order_date)}</td>
                    <td>{order.order_status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      {currentUserData && currentUserData.role === "Customer" && (
        <div className="displayContainer">
          <div className="displayTitle">Order</div>
          <table id="productList" class="displayTable">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Order Date</th>
                <th>Order Status</th>
                <th>Update Status</th>
              </tr>
            </thead>
            <tbody>
              {userOrders.map((order) => (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>{formatDate(order.order_date)}</td>
                  <td>{order.order_status}</td>
                  <td
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignSelf: "center",
                    }}
                  >
                    <button
                      className="changeStatusBtn"
                      onClick={() => handleAccept(order.id)}
                    >
                      Accept
                    </button>
                    <button
                      className="changeStatusBtn"
                      onClick={() => handleReject(order.id)}
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {!currentUserData && (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            textAlign: "center",
            padding: "20px",
          }}
        >
          Please log in to access this feature.
        </div>
      )}
      {currentUserData &&
        currentUserData.role !== "WarehouseWorker" &&
        currentUserData.role !== "Shipper" &&
        currentUserData.role !== "Customer" && (
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              textAlign: "center",
              padding: "20px",
            }}
          >
            Sorry, this feature is not available for your current role or
            permissions.
          </div>
        )}
    </>
  );
};

export default Order;
