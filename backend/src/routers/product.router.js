const express = require("express");
const { ProductController } = require("../controllers");

const router = express.Router();

router.route("/getAllProducts").get(ProductController.getAllProducts);
router.route("/createProduct").post(ProductController.createProduct);
router.route("/updateProduct").put(ProductController.updateProduct);
router.route("/deleteProduct").put(ProductController.deleteProduct);
router.route("/searchProduct").post(ProductController.searchProduct);
router.route("/filterByPrice").get(ProductController.filterByPrice);
router.route("/filterByCategory").get(ProductController.filterByCategory);

module.exports = router;
