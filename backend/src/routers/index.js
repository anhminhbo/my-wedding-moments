// Router is responsible for routing URL endpoint to specific controller
// responsible for the requested action
// also the place where Browser will send request to first
const UserRouter = require("./user.router");
const AuthRouter = require("./auth.router");
const OrderRouter = require("./order.router");
const WarehouseRouter = require("./warehouse.router");
const ProductRouter = require("./product.router");
const CategoryRouter = require("./category.router");
const InventoryRouter = require("./inventory.router")

module.exports = {
  UserRouter,
  AuthRouter,
  OrderRouter,
  WarehouseRouter,
  ProductRouter,
  CategoryRouter,
  InventoryRouter,
};
