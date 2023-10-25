const ResponseService = require("../response/response.service");
const Error = require("../../config/constant/Error");
const { sqlHelper } = require("../../utils");

const getAllInventory = async () => {
  const results = await sqlHelper.arraySqlQuery(`SELECT * FROM INVENTORY`);
  return results;
};

module.exports = {
  getAllInventory,
};
