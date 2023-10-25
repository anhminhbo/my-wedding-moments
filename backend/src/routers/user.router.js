const express = require("express");
const { UserController } = require("../controllers");

const router = express.Router();

router.route("/getUsername").get(UserController.getUsername);
router.route("/login").post(UserController.login);

// router.route("/createNewUser").post(UserController.createNewUser);

module.exports = router;
