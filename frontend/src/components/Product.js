import React, { useState, useEffect, useRef } from "react";
import "../style/table.css";
import "../style/product.css";
import "../style/searchbar.css";
import Header from "../components/Header";
import Form from "../components/Form";

const Product = () => {
  const backendURL = process.env.REACT_APP_BACKEND_URL;
  const keyword = useRef();
  const column = useRef();
  const order = useRef();
  const [products, setProducts] = useState([]);
  const userDataJSON = sessionStorage.getItem("userData");
  const [currentUserData, setCurrentUserData] = useState(null);
  const storedCart = JSON.parse(sessionStorage.getItem("cart")) || {
    productList: [],
  };
  const [cart, setCart] = useState(storedCart);
  const [updateID, setUpdateID] = useState();
  const productForm = [
    {
      name: "title",
      label: "Title",
      type: "text",
      required: true,
    },
    {
      name: "price",
      label: "Price",
      type: "number",
      required: true,
    },
    {
      name: "brand",
      label: "Brand",
      type: "text",
      required: true,
    },
    {
      name: "size",
      label: "Size (W * L * H)",
      type: "text",
      required: true,
    },
    {
      name: "category",
      label: "Category",
      type: "text",
      required: true,
    },
    {
      name: "description",
      label: "Description",
      type: "text",
      required: true,
    },
  ];
  const updateForm = [
    {
      name: "title",
      label: "Title",
      type: "text",
    },
    {
      name: "price",
      label: "Price",
      type: "number",
    },
    {
      name: "brand",
      label: "Brand",
      type: "text",
    },
    {
      name: "size",
      label: "Size (W * L * H)",
      type: "text",
    },
    {
      name: "category",
      label: "Category",
      type: "text",
    },
    {
      name: "description",
      label: "Description",
      type: "text",
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
    sessionStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    if (userDataJSON) {
      setCurrentUserData(JSON.parse(userDataJSON));
    }
    getAllProducts();
  }, []);

  const deleteProduct = async (productId) => {
    const url = backendURL + "/api/product/deleteProduct";
    const requestBody = {
      id: productId,
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
          alert(`Product successfully deleted!`);
          window.location.reload();
        } else {
          throw new Error(data.message);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    const day = date.getDate().toString().padStart(2, "0"); // Get the day and pad with leading 0 if necessary
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Get the month (months are 0-based) and pad with leading 0 if necessary
    const year = date.getFullYear();

    return `${day}/${month}/${year}, ${date.toLocaleTimeString()}`;
  };

  const ProductCard = ({ product }) => {
    const [quantity, setQuantity] = useState(1);

    const handleIncrement = () => {
      setQuantity(quantity + 1);
    };

    const handleDecrement = () => {
      if (quantity > 1) {
        setQuantity(quantity - 1);
      }
    };

    const handleAddToCart = () => {
      // Create a copy of the current cart
      const updatedCart = { ...cart };

      // Check if the product is already in the cart
      const existingProductIndex = updatedCart.productList.findIndex(
        (item) => item.product_id === product.id
      );

      if (existingProductIndex !== -1) {
        // Update the quantity if the product is already in the cart
        updatedCart.productList[existingProductIndex].quantity += quantity;
      } else {
        // Add the product to the cart as a new entry with the given quantity
        updatedCart.productList.push({
          product_id: product.id,
          quantity: quantity,
        });
      }
      console.log(cart);
      sessionStorage.setItem("cart", JSON.stringify(cart));

      // Update the cart state with the new cart data
      setCart(updatedCart);
    };

    return (
      <div className="product-card">
        <div className="product-info">
          <h2 className="product-name">{product.title}</h2>
          <p className="product-description">{product.description}</p>
          <p className="product-price">${product.price}</p>
          <div className="quantity-controls">
            <button onClick={handleDecrement}>-</button>
            <span>{quantity}</span>
            <button onClick={handleIncrement}>+</button>
          </div>
          <button
            className="add-to-cart-button"
            onClick={() => handleAddToCart()}
          >
            Add to Cart
          </button>
        </div>
      </div>
    );
  };

  const handleCloseForm = (id) => {
    const formOuter = document.getElementById(id);
    if (!formOuter) return;
    formOuter.style.visibility =
      formOuter.style.visibility === "hidden" ? "visible" : "hidden";
    formOuter.style.opacity = formOuter.style.opacity === "0" ? "1" : "0";
  };

  const extractingSize = (size) => {
    if (!size) return [-1, -1, -1];
    return size.split("*").map((value) => parseFloat(value.trim()));
  };

  const convertCategoryToArray = (categories) => {
    if (!categories) return "";
    return categories.split(", ");
  };

  const handleCloseUpdateForm = (id) => {
    setUpdateID(id);
    handleCloseForm("updateForm");
  };

  const handleSubmit = async (data) => {
    const [width, length, height] = extractingSize(data.size);
    const category = convertCategoryToArray(data.category);
    const newData = {
      title: data.title,
      price: data.price,
      brand: data.brand,
      width,
      length,
      height,
      category,
      description: data.description,
    };
    const url = backendURL + "/api/product/createProduct";
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
          alert(`Product successfully created!`);
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
    const [width, length, height] = extractingSize(data.size);
    const category = convertCategoryToArray(data.category);
    const newData = {
      id: updateID,
      title: data.title ? data.title : "",
      price: data.price ? data.price : -1,
      brand: data.brand ? data.brand : "",
      width,
      length,
      height,
      category,
      description: data.description ? data.description : "",
    };
    const url = backendURL + "/api/product/updateProduct";
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
          alert(`Product successfully updated!`);
          window.location.reload();
        } else {
          throw new Error(data.message);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleSearch = async () => {
    const url = backendURL + "/api/product/searchProduct";
    const data = {
      keyword: keyword.current.value,
      column: column.current.value ? column.current.value : "",
      order: order.current.value ? order.current.value : "",
    };
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    response
      .json()
      .then((data) => {
        if (response.ok) {
          console.log(data.data[0]);
          setProducts(data.data[0]);
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
      {/* FOR SELLER */}
      {currentUserData &&
        (currentUserData.role === "Seller" ||
          currentUserData.role === "WarehouseAdmin") && (
          <div className="displayContainer">
            <div className="displayTitle">Product Management</div>
            <div className="search">
              <select name="column" ref={column}>
                <option value="title">Title</option>
                <option value="price">Price</option>
                <option value="brand">Brand</option>
                <option value="width">Width</option>
                <option value="length">Length</option>
                <option value="height">Height</option>
                <option value="created_date">Created Date</option>
              </select>
              <select name="order" ref={order}>
                <option value="">None</option>
                <option value="ASC">Ascending</option>
                <option value="DESC">Descending</option>
              </select>
              <input
                type="text"
                placeholder="Search.."
                name="search"
                ref={keyword}
              />
              <button onClick={handleSearch}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-search"
                  viewBox="0 0 16 16"
                >
                  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                </svg>
              </button>
            </div>
            <table id="productList" class="displayTable">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Price</th>
                  <th>Brand</th>
                  <th>Width</th>
                  <th>Length</th>
                  <th>Height</th>
                  <th>Category</th>
                  <th>Created Date</th>
                  <th>Description</th>
                  <th>Delete Product</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id}>
                    <td>{product.title}</td>
                    <td>{product.price}</td>
                    <td style={{ whiteSpace: "nowrap" }}>{product.brand}</td>
                    <td>{product.width}</td>
                    <td>{product.length}</td>
                    <td>{product.height}</td>
                    <td>{product.category.join(", ")}</td>
                    <td>{formatDate(product.created_date)}</td>
                    <td>{product.description}</td>
                    <td className="delete-button">
                      <svg
                        style={{ verticalAlign: "middle" }}
                        onClick={() => deleteProduct(product.id)}
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
                        onClick={() => handleCloseUpdateForm(product.id)}
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
                  <td colspan="10" className="addBtn">
                    <button
                      id="createProductButton"
                      className="dashed-button"
                      onClick={() => handleCloseForm("productForm")}
                    >
                      +
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      {/* FOR CUSTOMER */}
      {currentUserData && currentUserData.role === "Customer" && (
        <div className="displayContainer">
          <div className="displayTitle">Product</div>
          <div className="search">
            <select name="column" ref={column}>
              <option value="title">Title</option>
              <option value="price">Price</option>
              <option value="brand">Brand</option>
              <option value="width">Width</option>
              <option value="length">Length</option>
              <option value="height">Height</option>
              <option value="created_date">Created Date</option>
            </select>
            <select name="order" ref={order}>
              <option value="">None</option>
              <option value="ASC">Ascending</option>
              <option value="DESC">Descending</option>
            </select>
            <input
              type="text"
              placeholder="Search.."
              name="search"
              ref={keyword}
            />
            <button onClick={handleSearch}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-search"
                viewBox="0 0 16 16"
              >
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
              </svg>
            </button>
          </div>
          <div className="displayContainerGrid">
            {products.map((product) => (
              <ProductCard product={product} />
            ))}
          </div>
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
      <Form
        id="productForm"
        fields={productForm}
        title={"Create Product"}
        handleClose={() => handleCloseForm("productForm")}
        handleSubmit={handleSubmit}
      />
      <Form
        id="updateForm"
        fields={updateForm}
        title={"Update Product"}
        handleClose={() => handleCloseForm("updateForm")}
        handleSubmit={handleUpdate}
      />
    </>
  );
};

export default Product;
