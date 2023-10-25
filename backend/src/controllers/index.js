// Controller is responsible for controlling handlers for different actions
// by connecting to Service layer and make Service does the job
// for example: respond back to the client, redirect, rendering

const UserController = require("./user.controller");
const AuthController = require("./auth.controller");
const OrderController = require("./order.controller");
const WarehouseController = require("./warehouse.controller");
const ProductController = require("./product.controller");
const CategoryController = require("./category.controller");
const InventoryController = require("./inventory.controller")

module.exports = {
  UserController,
  AuthController,
  OrderController,
  WarehouseController,
  ProductController,
  CategoryController,
  InventoryController
};
