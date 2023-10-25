const { ResponseService, ProductService } = require("../services");
const Error = require("../config/constant/Error");
const catchAsync = require("../utils/catchAsync");

const getAllProducts = catchAsync(async (req, res) => {
  const data = await ProductService.getAllProducts();
  res.status(200).json(ResponseService.newSucess(data));
});

const createProduct = catchAsync(async (req, res) => {
  const { title, price, brand, width, length, height, category, description } =
    req.body;

  const result = await ProductService.createProduct(
    title,
    price,
    brand,
    width,
    length,
    height,
    category,
    description
  );

  res.body = ResponseService.newSucess(result);
  res.status(200).json(res.body);
});

const updateProduct = async (req, res) => {
  const {
    id,
    title,
    price,
    brand,
    width,
    length,
    height,
    category,
    description,
  } = req.body;
  const result = await ProductService.updateProduct(
    id, // Assuming you have an ID to identify the product record
    title,
    price,
    brand,
    width,
    length,
    height,
    category,
    description
  );
  res.body = ResponseService.newSucess(result);
  res.status(200).json(res.body);
};

const deleteProduct = async (req, res) => {
  const { id } = req.body;
  const result = await ProductService.deleteProduct(
    id // Assuming you have an ID to identify the warehouse record
  );
  res.body = ResponseService.newSucess(result);
  res.status(200).json(res.body);
};

const searchProduct = async (req, res) => {
  const { keyword, column, order } = req.body;
  const result = await ProductService.searchProduct(keyword, column, order);
  res.body = ResponseService.newSucess(result);
  res.status(200).json(res.body);
};

const filterByPrice = async (req, res) => {
  const { minPrice, maxPrice, column, order } = req.body;
  const result = await ProductService.filterByPrice(
    minPrice,
    maxPrice,
    column,
    order
  );
  res.body = ResponseService.newSucess(result);
  res.status(200).json(res.body);
};

const filterByCategory = async (req, res) => {
  const { categoryName, sortColumn, sortOrder } = req.body;
  const result = await ProductService.filterByCategory(
    categoryName,
    sortColumn,
    sortOrder
  );
  res.body = ResponseService.newSucess(result);
  res.status(200).json(res.body);
};

module.exports = {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  searchProduct,
  filterByPrice,
  filterByCategory,
};
