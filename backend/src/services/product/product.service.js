const ResponseService = require("../response/response.service");
const Error = require("../../config/constant/Error");
const { sqlHelper } = require("../../utils");

const getAllProducts = async () => {
  const results = await sqlHelper.arraySqlQuery(`SELECT * FROM PRODUCTS`);
  return results;
};

const createProduct = async (
  title,
  price,
  brand,
  width,
  length,
  height,
  category,
  description
) => {
  const params = [
    title,
    price,
    brand,
    width,
    length,
    height,
    category,
    description,
  ];
  const results = await sqlHelper.arraySqlQuery(
    "INSERT INTO PRODUCTS (title, price, brand, width, length, height, category, description) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
    params
  );

  return results;
};

const updateProduct = async (
  id, // Assuming you have an ID to identify the product record
  title,
  price,
  brand,
  width,
  length,
  height,
  category,
  description
) => {
  const params = [
    id, // Assuming you have an ID to identify the product record
    title,
    price,
    brand,
    width,
    length,
    height,
    JSON.stringify(category),
    description,
  ];
  const results = await sqlHelper.arraySqlQuery(
    `CALL UpdateProductAttributes(?,?,?,?,?,?,?,?,?)`,
    params
  );

  return results;
};

const deleteProduct = async (
  id // Assuming you have an ID to identify the warehouse record
) => {
  const results = await sqlHelper.arraySqlQuery(
    `CALL DeleteProductById(${id})`
  );
  return results;
};

const searchProduct = async (keyword, column, order) => {
  const params = [keyword, column, order];
  const results = await sqlHelper.arraySqlQuery(
    `CALL SearchProductsByKeywords(?, ?, ?);`,
    params
  );
  return results;
};

const filterByPrice = async (minPrice, maxPrice, column, order) => {
  const params = [minPrice, maxPrice, column, order];
  const results = await sqlHelper.arraySqlQuery(
    `CALL FilterProductsByPriceRange(?, ?, ?, ?)`,
    params
  );
  return results;
};

const filterByCategory = async (categoryName, sortColumn, sortOrder) => {
  const params = [categoryName, sortColumn, sortOrder];
  const results = await sqlHelper.arraySqlQuery(
    `CALL FilterProductsByCategory(?, ?, ?)`,
    params
  );
  return results;
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
