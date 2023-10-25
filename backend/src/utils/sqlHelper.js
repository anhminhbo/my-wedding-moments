const { mysqlPool } = require("../config/init.mysql");

const getOffset = (currentPage = 1, listPerPage) => {
  return (currentPage - 1) * [listPerPage];
};

const emptyOrRows = (rows) => {
  if (!rows) {
    return [];
  }
  return rows;
};

const arraySqlQuery = async (sql, params) => {
  const [results] = await mysqlPool.execute(sql, params);

  return results;
};

const normalSqlQuery = async (sql, params) => {
  const results = await mysqlPool.execute(sql, params);

  return results;
};

const getMultiple = async (page = 1) => {
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.sqlQuery(
    `SELECT id, name, released_year, githut_rank, pypl_rank, tiobe_rank 
      FROM programming_languages LIMIT ${offset},${config.listPerPage}`
  );
  const data = helper.emptyOrRows(rows);
  const meta = { page };

  return {
    data,
    meta,
  };
};

module.exports = {
  arraySqlQuery,
  normalSqlQuery,
  getMultiple,
};
