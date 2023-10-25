const express = require("express");
const { OrderController } = require("../controllers");

const router = express.Router();

router.route("/createInboundOrder").post(OrderController.createInboundOrder);
router.route("/placeOrder").post(OrderController.placeOrder);
router.route("/acceptOrder").post(OrderController.acceptOrder);
router.route("/rejectOrder").post(OrderController.rejectOrder);
router.route("/getAllOrders").get(OrderController.getAllOrders);
router.route("/getAllInboundOrders").get(OrderController.getAllInboundOrders);

module.exports = router;
