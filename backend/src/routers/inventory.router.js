const express = require("express");
const { InventoryController } = require("../controllers");

const router = express.Router();

router.route("/getAllInventory").get(InventoryController.getAllInventory);

module.exports = router;
