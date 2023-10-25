import React, { useState, useEffect } from "react";
import "../style/table.css";
import Header from "../components/Header";
import Form from "../components/Form";

const Category = () => {
  const backendURL = process.env.REACT_APP_BACKEND_URL;
  const userDataJSON = sessionStorage.getItem("userData");
  const [currentUserData, setCurrentUserData] = useState(null);
  const [categories, setCategories] = useState([]);
  const [updateCategoryName, CN] = useState();
  const categoryForm = [
    {
      name: "name",
      label: "Name",
      type: "text",
      required: true,
    },
  ];

  const updateCategoryForm = [
    {
      name: "name",
      label: "Name",
      type: "text",
    },
  ];

  useEffect(() => {
    if (userDataJSON) {
      setCurrentUserData(JSON.parse(userDataJSON));
    }
    const url = backendURL + "/api/category/getAllCategories";
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Connection error!");
        }
        return response.json();
      })
      .then((data) => {
        setCategories(data.data);
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  }, []);

  const deleteCategory = async (name) => {
    const url = backendURL + "/api/category/deleteCategory";
    const requestBody = {
      name,
      parentCategory: "",
    };
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    response
      .json()
      .then((data) => {
        if (response.ok) {
          alert(`Category successfully deleted!`);
          window.location.reload();
        } else {
          alert(data.errMessage);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleCloseForm = (id) => {
    const formOuter = document.getElementById(id);
    if (!formOuter) return;
    formOuter.style.visibility =
      formOuter.style.visibility === "hidden" ? "visible" : "hidden";
    formOuter.style.opacity = formOuter.style.opacity === "0" ? "1" : "0";
  };

  const handleSubmit = async (data) => {
    const newData = {
      name: data.name,
      parentCategory: "64fc1feca34779e4f087c553",
    };
    const url = backendURL + "/api/category/createCategory";
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
          alert(`Category successfully created!`);
          window.location.reload();
        } else {
          throw new Error(data.message);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleUpdate = async (data) => {
    const newData = {
      name: updateCategoryName,
      parentCategory: "",
      newName: data.name,
    };
    console.log(newData);
    const url = backendURL + "/api/category/updateCategory";
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
          alert(`Category successfully updated!`);
          window.location.reload();
        } else {
          alert(data.errMessage);
          handleCloseForm("updateCategoryForm");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleCloseUpdateForm = (name) => {
    CN(name);
    handleCloseForm("updateCategoryForm");
  };

  return (
    <>
      {userDataJSON && <Header />}
      {currentUserData && currentUserData.role === "WarehouseAdmin" && (
        <div className="displayContainer">
          <div className="displayTitle">Category Management</div>
          <table id="productList" class="displayTable">
            <thead>
              <tr>
                <th>Name</th>
                <th>Delete Category</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category) => (
                <tr key={category.id}>
                  <td>{category.name}</td>
                  <td class="delete-button">
                    <svg
                      style={{ verticalAlign: "middle" }}
                      onClick={() => deleteCategory(category.name)}
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
                  <td style={{ border: "none", width: "20px" }}>
                    <svg
                      onClick={() => handleCloseUpdateForm(category.name)}
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
                <td colspan="3" className="addBtn">
                  <button
                    id="createWarehouseButton"
                    className="dashed-button"
                    onClick={() => handleCloseForm("categoryForm")}
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
        id="categoryForm"
        fields={categoryForm}
        title={"Create Category"}
        handleClose={(e) => handleCloseForm("categoryForm")}
        handleSubmit={handleSubmit}
      />
      <Form
        id="updateCategoryForm"
        fields={updateCategoryForm}
        title={"Update Category"}
        handleClose={(e) => handleCloseForm("updateCategoryForm")}
        handleSubmit={handleUpdate}
      />
    </>
  );
};

export default Category;
