const { ResponseService, InventoryService } = require("../services");
const Error = require("../config/constant/Error");
const catchAsync = require("../utils/catchAsync");

const getAllInventory = catchAsync(async (req, res) => {
  const data = await InventoryService.getAllInventory();
  res.status(200).json(ResponseService.newSucess(data));
});

module.exports = {
  getAllInventory,
};
