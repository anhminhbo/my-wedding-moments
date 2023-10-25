import React, { useState, useEffect } from "react";
import "../style/table.css";
import Header from "../components/Header";
import Form from "../components/Form";

const Warehouse = () => {
  const backendURL = process.env.REACT_APP_BACKEND_URL;
  const [warehouses, setWarehouses] = useState([]);
  const userDataJSON = sessionStorage.getItem("userData");
  const [currentUserData, setCurrentUserData] = useState(null);
  const [updateID, setUpdateID] = useState();
  const warehouseForm = [
    {
      name: "name",
      label: "Name",
      type: "text",
      required: true,
    },
    {
      name: "province",
      label: "Province",
      type: "text",
      required: true,
    },
    {
      name: "city",
      label: "City",
      type: "text",
      required: true,
    },
    {
      name: "district",
      label: "District",
      type: "text",
      required: true,
    },
    {
      name: "street",
      label: "Street",
      type: "text",
      required: true,
    },
    {
      name: "number",
      label: "Number",
      type: "number",
      required: true,
    },
    {
      name: "total_area_volume",
      label: "Total Area Volume",
      type: "number",
      required: true,
    },
  ];
  const updateWarehouseForm = [
    {
      name: "name",
      label: "Name",
      type: "text",
    },
    {
      name: "province",
      label: "Province",
      type: "text",
    },
    {
      name: "city",
      label: "City",
      type: "text",
    },
    {
      name: "district",
      label: "District",
      type: "text",
    },
    {
      name: "street",
      label: "Street",
      type: "text",
    },
    {
      name: "number",
      label: "Number",
      type: "number",
    },
    {
      name: "total_area_volume",
      label: "Total Area Volume",
      type: "number",
    },
  ];

  useEffect(() => {
    if (userDataJSON) {
      setCurrentUserData(JSON.parse(userDataJSON));
    }
    // Define the API endpoint URL
    const apiUrl = backendURL + "/api/warehouse/getAllWarehouse";

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
        setWarehouses(data.data); // Assuming the response is an array of warehouses
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  }, []);

  const handleCloseForm = (id) => {
    const formOuter = document.getElementById(id);
    if (!formOuter) return;
    formOuter.style.visibility =
      formOuter.style.visibility === "hidden" ? "visible" : "hidden";
    formOuter.style.opacity = formOuter.style.opacity === "0" ? "1" : "0";
  };

  const deleteWarehouse = async (warehouseId) => {
    const url = backendURL + "/api/warehouse/deleteWarehouse";
    const requestBody = {
      id: warehouseId,
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
          alert(`Warehouse successfully deleted!`);
          window.location.reload();
        } else {
          alert(data.errMessage);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleSubmit = async (data) => {
    console.log(data);
    const url = backendURL + "/api/warehouse/createWarehouse";
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
          alert(`Warehouse successfully created!`);
          window.location.reload();
        } else {
          throw new Error(data.message);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleCloseUpdateForm = (id) => {
    setUpdateID(id);
    handleCloseForm("updateWarehouseForm");
  };

  const handleUpdate = async (data) => {
    const newData = {
      id: updateID,
      name: data.name ? data.name : "",
      province: data.province ? data.province : "",
      city: data.city ? data.city : "",
      district: data.district ? data.district : "",
      street: data.street ? data.street : "",
      number: data.number ? data.number : "",
      total_area_volume: data.total_area_volume ? data.total_area_volume : -1,
    };
    console.log(newData);
    const url = backendURL + "/api/warehouse/updateWarehouse";
    const response = await fetch(url, {
      method: "PUT", // Use PUT for updating
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newData),
    });

    response
      .json()
      .then((data) => {
        if (response.ok) {
          alert(`Warehouse successfully updated!`);
          window.location.reload();
        } else {
          throw new Error(data.message);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <>
      {userDataJSON && <Header />}
      {currentUserData && currentUserData.role === "WarehouseAdmin" && (
        <div className="displayContainer">
          <div className="displayTitle">Warehouse Management</div>
          <table id="warehouseList" className="displayTable">
            <thead>
              <tr>
                <th>Name</th>
                <th>Province</th>
                <th>City</th>
                <th>District</th>
                <th>Street</th>
                <th>Number</th>
                <th>Total Area Volume</th>
                <th>Delete Warehouse</th>
              </tr>
            </thead>
            <tbody>
              {warehouses.map((warehouse) => (
                <tr key={warehouse.id}>
                  <td>{warehouse.name}</td>
                  <td>{warehouse.province}</td>
                  <td>{warehouse.city}</td>
                  <td>{warehouse.district}</td>
                  <td>{warehouse.street}</td>
                  <td>{warehouse.number}</td>
                  <td>{warehouse.total_area_volume}</td>
                  <td className="delete-button">
                    <svg
                      style={{ verticalAlign: "middle" }}
                      onClick={() => deleteWarehouse(warehouse.id)}
                      xmlns="http://www.w3.org/2000/svg"
                      width="25"
                      height="25"
                      fill="currentColor"
                      class="bi bi-x-circle-fill"
                      viewBox="0 0 16 16"
                    >
                      <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z" />
                    </svg>
                  </td>
                  <td style={{ border: "none" }}>
                    <svg
                      onClick={() => handleCloseUpdateForm(warehouse.id)}
                      className="update-button bi bi-pencil-square"
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      viewBox="0 0 16 16"
                    >
                      <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                      <path
                        fill-rule="evenodd"
                        d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
                      />
                    </svg>
                  </td>
                </tr>
              ))}
              <tr>
                <td colspan="8" className="addBtn">
                  <button
                    id="createWarehouseButton"
                    className="dashed-button"
                    onClick={() => handleCloseForm("warehouseForm")}
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
      {currentUserData && currentUserData.role !== "WarehouseAdmin" && (
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
        id="warehouseForm"
        fields={warehouseForm}
        title={"Create Warehouse"}
        handleClose={(e) => handleCloseForm("warehouseForm")}
        handleSubmit={handleSubmit}
      />
      <Form
        id="updateWarehouseForm"
        fields={updateWarehouseForm}
        title={"Update Warehouse"}
        handleClose={() => handleCloseForm("updateWarehouseForm")}
        handleSubmit={handleUpdate}
      />
    </>
  );
};

export default Warehouse;
