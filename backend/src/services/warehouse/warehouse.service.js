const ResponseService = require("../response/response.service");
const Error = require("../../config/constant/Error");
const { sqlHelper } = require("../../utils");

const getAllWarehouse = async () => {
  const results = await sqlHelper.arraySqlQuery(`SELECT * FROM WAREHOUSE`);

  return results;
};

const createWarehouse = async (
  name,
  province,
  city,
  district,
  street,
  number,
  total_area_volume
) => {
  const params = [
    name,
    province,
    city,
    district,
    street,
    number,
    total_area_volume,
  ];
  const results = await sqlHelper.arraySqlQuery(
    "INSERT INTO WAREHOUSE (name, province, city, district, street, number, total_area_volume) VALUES (?, ?, ?, ?, ?, ?, ?)",
    params
  );

  return results;
};

const updateWarehouse = async (
  id, 
  name,
  province,
  city,
  district,
  street,
  number,
  total_area_volume
) => {
  const params = [
    id, 
    name,
    province,
    city,
    district,
    street,
    number,
    total_area_volume
  ];
  const results = await sqlHelper.arraySqlQuery(
    `CALL UpdateWarehouse (?, ?, ?, ?, ?, ?, ?, ?)`,
    params
  );

  return results;
};

const deleteWarehouse = async (
  id // Assuming you have an ID to identify the warehouse record
) => {
  const results = await sqlHelper.arraySqlQuery(`CALL DeleteWarehouse (${id})`);
  return results;
};

const moveProducts = async (
  productId, // Assuming you have an ID to identify the warehouse record
  sourceWarehouseId, // Assuming you have an ID to identify the
  destWarehouseId, // Assuming you have an ID to identify the
  productQuantity
) => {
  const results = await sqlHelper.arraySqlQuery(
    `CALL MoveInventory(${productId}, ${sourceWarehouseId}, ${destWarehouseId}, ${productQuantity})`
  );
  return results;
};

module.exports = {
  getAllWarehouse,
  createWarehouse,
  updateWarehouse,
  deleteWarehouse,
  moveProducts,
};
