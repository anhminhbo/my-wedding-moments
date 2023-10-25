const ResponseService = require("../response/response.service");
const Error = require("../../config/constant/Error");
const { sqlHelper } = require("../../utils");

const createInboundOrder = async (productId, quantity) => {
  console.log(productId, quantity);
  const params = [productId, quantity]
  const results = await sqlHelper.arraySqlQuery(
    `CALL CreateInboundOrder(?, ?)`,
    params
  );

  return results;
};

const placeOrder = async (customerId, productList) => {
  console.log(customerId, productList);
  const params = [customerId, JSON.stringify(productList)];
  const results = await sqlHelper.arraySqlQuery(`CALL PlaceOrder(?,?)`, params);

  return results;
};

const acceptOrder = async (orderId) => {
  const params = [orderId];
  const results = await sqlHelper.arraySqlQuery(
    `CALL AcceptedOrder(?)`,
    params
  );

  return results;
};

const rejectOrder = async (orderId) => {
  const params = [orderId];
  const results = await sqlHelper.arraySqlQuery(
    `CALL RejectedOrder(?)`,
    params
  );

  return results;
};

const getAllOrders = async () => {
  const results = await sqlHelper.arraySqlQuery(`SELECT * FROM ORDERS`);

  return results;
};

const getAllInboundOrders = async () => {
  const results = await sqlHelper.arraySqlQuery(`SELECT * FROM INBOUND_ORDERS`);

  return results;
};

module.exports = {
  createInboundOrder,
  placeOrder,
  acceptOrder,
  rejectOrder,
  getAllOrders,
  getAllInboundOrders,
};
