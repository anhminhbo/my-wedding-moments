const express = require("express");
const { AuthController } = require("../controllers");

const router = express.Router();

router.route("/register").post(AuthController.register);

router.route("/login").post(AuthController.login);

router.route("/logout").get( AuthController.logout);

router
  .route("/changePassword")
  .put(AuthController.changePassword);

module.exports = router;
