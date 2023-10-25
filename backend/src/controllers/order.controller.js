const { ResponseService, OrderService } = require("../services");
const Error = require("../config/constant/Error");
const catchAsync = require("../utils/catchAsync");

const getAllInboundOrders = catchAsync(async (req, res) => {
  const data = await OrderService.getAllInboundOrders();

  res.status(200).json(ResponseService.newSucess(data));
});

const createInboundOrder = catchAsync(async (req, res) => {
  const { productId, quantity } = req.body;

  const result = await OrderService.createInboundOrder(productId, quantity);

  res.body = ResponseService.newSucess(result);
  res.status(200).json(res.body);
});

const placeOrder = catchAsync(async (req, res) => {
  const { customerId, productList } = req.body;

  const result = await OrderService.placeOrder(customerId, productList);

  res.body = ResponseService.newSucess(result);
  res.status(200).json(res.body);
});

const acceptOrder = catchAsync(async (req, res) => {
  const { orderId } = req.body;

  const result = await OrderService.acceptOrder(orderId);

  res.body = ResponseService.newSucess(result);
  res.status(200).json(res.body);
});

const rejectOrder = catchAsync(async (req, res) => {
  const { orderId } = req.body;

  const result = await OrderService.rejectOrder(orderId);

  res.body = ResponseService.newSucess(result);
  res.status(200).json(res.body);
});

const getAllOrders = catchAsync(async (req, res) => {
  const result = await OrderService.getAllOrders();

  res.body = ResponseService.newSucess(result);
  res.status(200).json(res.body);
});

module.exports = {
  getAllInboundOrders,
  createInboundOrder,
  placeOrder,
  acceptOrder,
  rejectOrder,
  getAllOrders,
};
