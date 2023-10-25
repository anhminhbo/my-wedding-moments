// Services layer responsible for business logic of the application
// For example query db, handle complex business logic like validation,...
const ResponseService = require("./response/response.service");
const UserService = require("./user/user.service");
const AuthService = require("./auth/auth.service");
const OrderService = require("./order/order.service");
const WarehouseService = require("./warehouse/warehouse.service");
const ProductService = require("./product/product.service");
const CategoryService = require("./category/category.service");
const InventoryService = require("./inventory/inventory.service")

module.exports = {
  ResponseService,
  UserService,
  AuthService,
  OrderService,
  WarehouseService,
  ProductService,
  CategoryService,
  InventoryService,
};
