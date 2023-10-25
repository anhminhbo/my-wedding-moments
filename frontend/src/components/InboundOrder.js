import React, { useState, useEffect } from "react";
import "../style/table.css";
import Header from "../components/Header";
import Form from "../components/Form";

const InboundOrder = () => {
  const backendURL = process.env.REACT_APP_BACKEND_URL;
  const [IOs, setIOs] = useState([]);
  const userDataJSON = sessionStorage.getItem("userData");
  const [products, setProducts] = useState([]);
  const [currentUserData, setCurrentUserData] = useState(null);
  const [updateID, setUpdateID] = useState();
  const [newData, ND] = useState([]);
  const IOForm = [
    {
      name: "product_id",
      label: "Product ID",
      type: "number",
      required: true,
    },
    {
      name: "quantity",
      label: "Quantity",
      type: "number",
      required: true,
    },
  ];

  const getAllProducts = () => {
    const url = backendURL + "/api/product/getAllProducts";
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Connection error!");
        }
        return response.json();
      })
      .then((data) => {
        setProducts(data.data);
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  };

  useEffect(() => {
    if (userDataJSON) {
      setCurrentUserData(JSON.parse(userDataJSON));
    }
    // Define the API endpoint URL
    const apiUrl = backendURL + "/api/order/getAllInboundOrders";

    // Make the GET request
    fetch(apiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Connection error!");
        }
        return response.json();
      })
      .then((data) => {
        // Handle the data from the response
        setIOs(data.data); // Assuming the response is an array of IOs
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
    getAllProducts();
  }, []);

  useEffect(() => {
    const combinedData = IOs.map((orderItem) => {
      const matchingProduct = products.find(
        (productItem) => productItem.id === orderItem.product_id
      );

      if (matchingProduct) {
        return {
          ...orderItem,
          product_name: matchingProduct.title, // Add the product name to the dataset
          product_description: matchingProduct.description, // Add any other product information you need
        };
      }

      return orderItem; // If no matching product is found, return the original order item
    });
    console.log(combinedData);
    ND(combinedData);
  }, [IOs, products]);

  const handleCloseForm = (id) => {
    const formOuter = document.getElementById(id);
    if (!formOuter) return;
    formOuter.style.visibility =
      formOuter.style.visibility === "hidden" ? "visible" : "hidden";
    formOuter.style.opacity = formOuter.style.opacity === "0" ? "1" : "0";
  };

  const deleteIO = async (IOId) => {
    const url = backendURL + "/api/IO/deleteIO";
    const requestBody = {
      id: IOId,
    };
    const response = await fetch(url, {
      method: "PUT", // Use PUT for updating
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    response
      .json()
      .then((data) => {
        if (response.ok) {
          alert(`IO successfully deleted!`);
          window.location.reload();
        } else {
          throw new Error(data.message);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleSubmit = async (data) => {
    const newData = {
      productId: data.product_id,
      quantity: data.quantity,
    };
    const url = backendURL + "/api/order/createInboundOrder";
    const response = await fetch(url, {
      method: "POST", // Use PUT for updating
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newData),
    });

    response
      .json()
      .then((data) => {
        if (response.ok) {
          alert(`Inbound Order successfully created!`);
          window.location.reload();
        } else {
          console.log(data);
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
        (currentUserData.role === "Seller" ||
          currentUserData.role === "WarehouseWorker") && (
          <div className="displayContainer">
            <div className="displayTitle">Inbound Order Management</div>
            <table id="IOList" className="displayTable">
              <thead>
                <tr>
                  <th>Product ID</th>
                  <th>Product Name</th>
                  <th>Quantity</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {newData.length > 0 &&
                  newData.map((data) => (
                    <tr key={data.id}>
                      <td>{data.product_id}</td>
                      <td>{data.product_name}</td>
                      <td>{data.quantity}</td>
                      <td>{data.status}</td>
                    </tr>
                  ))}
                <tr>
                  <td colspan="8" className="addBtn">
                    <button
                      id="createIOButton"
                      className="dashed-button"
                      onClick={() => handleCloseForm("IOForm")}
                    >
                      +
                    </button>
                  </td>
                </tr>
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
        currentUserData.role !== "Seller" &&
        currentUserData.role !== "WarehouseWorker" && (
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
      <Form
        id="IOForm"
        fields={IOForm}
        title={"Create IO"}
        handleClose={(e) => handleCloseForm("IOForm")}
        handleSubmit={handleSubmit}
      />
    </>
  );
};

export default InboundOrder;
