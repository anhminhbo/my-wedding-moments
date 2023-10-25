const express = require("express");
const { CategoryController } = require("../controllers");

const router = express.Router();

router.route("/createCategory").post(CategoryController.createCategory);
router.route("/getAllCategories").get(CategoryController.getAllCategories);
router.route("/updateCategory").put(CategoryController.updateCategory);
router.route("/deleteCategory").delete(CategoryController.deleteCategory);

// router.route("/createNewUser").post(UserController.createNewUser);

module.exports = router;
