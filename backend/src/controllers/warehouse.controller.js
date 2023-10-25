const { ResponseService, WarehouseService } = require("../services");
const Error = require("../config/constant/Error");
const catchAsync = require("../utils/catchAsync");

const getAllWarehouse = catchAsync(async (req, res) => {
  const data = await WarehouseService.getAllWarehouse();
  res.status(200).json(ResponseService.newSucess(data));
});

const createWarehouse = catchAsync(async (req, res) => {
  const { name, province, city, district, street, number, total_area_volume } =
    req.body;

  const result = await WarehouseService.createWarehouse(
    name,
    province,
    city,
    district,
    street,
    number,
    total_area_volume
  );

  res.body = ResponseService.newSucess(result);
  res.status(200).json(res.body);
});

const updateWarehouse = async (req, res) => {
  const { id, name, province, city, district, street, number, total_area_volume } = req.body;
  const result = await WarehouseService.updateWarehouse(
    id, 
    name,
    province,
    city,
    district,
    street,
    number,
    total_area_volume
  );

  res.body = ResponseService.newSucess(result);
  res.status(200).json(res.body);
};

const deleteWarehouse = async (req, res) => {
  const { id } = req.body;
  const result = await WarehouseService.deleteWarehouse(
    id // Assuming you have an ID to identify the warehouse record
  );

  res.body = ResponseService.newSucess(result);
  res.status(200).json(res.body);
};

const moveProducts = async (req, res) => {
  const {
    productId, // Assuming you have an ID to identify the warehouse record
    sourceWarehouseId, // Assuming you have an ID to identify the
    destWarehouseId, // Assuming you have an ID to identify the
    productQuantity,
  } = req.body;
  const result = await WarehouseService.moveProducts(
    productId, // Assuming you have an ID to identify the warehouse record
    sourceWarehouseId, // Assuming you have an ID to identify the
    destWarehouseId, // Assuming you have an ID to identify the
    productQuantity
  );

  res.body = ResponseService.newSucess(result);
  res.status(200).json(res.body);
};

module.exports = {
  getAllWarehouse,
  createWarehouse,
  updateWarehouse,
  deleteWarehouse,
  moveProducts,
};
