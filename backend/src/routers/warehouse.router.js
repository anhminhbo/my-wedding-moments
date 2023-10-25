const express = require("express");
const { WarehouseController } = require("../controllers");

const router = express.Router();

router.route("/getAllWarehouse").get(WarehouseController.getAllWarehouse);
router.route("/createWarehouse").post(WarehouseController.createWarehouse);
router.route("/updateWarehouse").put(WarehouseController.updateWarehouse);
router.route("/deleteWarehouse").put(WarehouseController.deleteWarehouse);
router.route("/moveProducts").post(WarehouseController.moveProducts);
router.route("/moveProducts").post(WarehouseController.moveProducts);


module.exports = router;
