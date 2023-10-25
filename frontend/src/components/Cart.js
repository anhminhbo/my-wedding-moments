import React, { useState, useEffect, useRef } from "react";
import "../style/table.css";
import "../style/cart.css";
import Header from "../components/Header";

const Cart = () => {
  const backendURL = process.env.REACT_APP_BACKEND_URL;
  const storedCart = JSON.parse(sessionStorage.getItem("cart")) || {
    productList: [],
  };
  const userDataJSON = sessionStorage.getItem("userData");
  const [currentUserData, setCurrentUserData] = useState(null);
  const [cart, setCart] = useState(storedCart);
  const [cartWithDetails, CWD] = useState([]);
  const [products, setProducts] = useState([]);

  const QuantityControls = ({ quantity, onDecrement, onIncrement }) => {
    return (
      <div className="quantity-controls" style={{ margin: "0" }}>
        <button onClick={onDecrement}>-</button>
        <span>{quantity}</span>
        <button onClick={onIncrement}>+</button>
      </div>
    );
  };

  const handleIncrement = (productId) => {
    // Find the index of the product with the matching ID in the cart
    const productIndex = cart.productList.findIndex(
      (item) => item.product_id === productId
    );

    if (productIndex !== -1) {
      // Increase the quantity of the product in the cart
      cart.productList[productIndex].quantity += 1;
    }

    // Update the cart in your state or storage
    setCart({ ...cart });
  };

  const handleDecrement = (productId) => {
    // Find the index of the product with the matching ID in the cart
    const productIndex = cart.productList.findIndex(
      (item) => item.product_id === productId
    );

    if (productIndex !== -1) {
      // Decrease the quantity of the product in the cart
      if (cart.productList[productIndex].quantity > 1) {
        cart.productList[productIndex].quantity -= 1;
      } else {
        // If quantity is 1 or less, remove the item from the cart
        cart.productList.splice(productIndex, 1);
      }
    }

    // Update the cart in your state or storage
    setCart({ ...cart });
  };

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

  const getProductDetailsWithQuantity = (product_id) => {
    const cartItem = cart.productList.find(
      (item) => item.product_id === product_id
    );
    const product = products.find((product) => product.id === product_id);

    if (cartItem && product) {
      const {
        id,
        title,
        price,
        brand,
        width,
        length,
        height,
        category,
        description,
      } = product;

      return {
        id,
        title,
        price,
        brand,
        width,
        length,
        height,
        category,
        description,
        quantity: cartItem.quantity,
      };
    }

    return null; // Product not found in either the cart or the product list
  };

  useEffect(() => {
    getAllProducts();
    if (userDataJSON) {
      setCurrentUserData(JSON.parse(userDataJSON));
    }
  }, []);

  useEffect(() => {
    sessionStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    const cartWithDetails = cart.productList.map((cartItem) => ({
      ...getProductDetailsWithQuantity(cartItem.product_id),
    }));
    console.log(cart);
    CWD(cartWithDetails);
  }, [cart, products]);

  console.log(
    cartWithDetails.length > 0 &&
      cartWithDetails[0] &&
      cartWithDetails[0].category
      ? cartWithDetails[0].category
      : 0
  );

  const handlePlaceOrder = async () => {
    const userData = JSON.parse(sessionStorage.getItem("userData"));
    const data = {
      customerId: userData.id,
      productList: cart.productList,
    };
    const url = backendURL + "/api/order/placeOrder";
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
          alert(`Order successfully placed!`);
          sessionStorage.removeItem("cart");
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
      {currentUserData && <Header />}
      {currentUserData && currentUserData.role === "Customer" && (
        <div className="displayContainer">
          <div className="displayTitle">Cart</div>
          {cart.productList.length < 1 && (
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
              Your cart is currently empty. Please add products to continue
              shopping.
            </div>
          )}
          {cart.productList.length > 0 && (
            <table className="displayTable">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Price</th>
                  <th>Brand</th>
                  <th>Width</th>
                  <th>Length</th>
                  <th>Height</th>
                  <th>Category</th>
                  <th>Description</th>
                  <th>Quantity</th>
                </tr>
              </thead>
              <tbody>
                {cartWithDetails
                  ? cartWithDetails.map((item) => (
                      <tr key={item.id}>
                        <td>{item.title}</td>
                        <td>{item.price}</td>
                        <td>{item.brand}</td>
                        <td>{item.width}</td>
                        <td>{item.length}</td>
                        <td>{item.height}</td>
                        <td>
                          {item && item.category
                            ? item.category.join(", ")
                            : item.category}
                        </td>
                        <td>{item.description}</td>
                        <td>
                          <QuantityControls
                            quantity={item.quantity}
                            onIncrement={() => handleIncrement(item.id)}
                            onDecrement={() => handleDecrement(item.id)}
                          />
                        </td>
                      </tr>
                    ))
                  : ""}
              </tbody>
            </table>
          )}
          <input
            className="placeOrderButton"
            type="button"
            value="Place Order"
            onClick={handlePlaceOrder}
          />
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
      {currentUserData && currentUserData.role !== "Customer" && (
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

export default Cart;
