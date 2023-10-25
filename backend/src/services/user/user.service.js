const { UserModel } = require("../../models");
const { sqlHelper } = require("../../utils");
const crypto = require("crypto");

const createUser = async (username, password) => {
  const userToBeCreate = new UserModel({
    username,
    password,
  });

  const user = await userToBeCreate.save();
  return user;
};

const login = async (username, password) => {
  // Create a SHA-256 hash object
  const hash = crypto.createHash("sha256");

  // Update the hash with the input string
  hash.update(password);

  // Get the hexadecimal representation of the hash
  const hashedPassword = hash.digest("hex");

  const params = [username, hashedPassword];

  const results = await sqlHelper.arraySqlQuery(
    `SELECT * from USERS where username=? and password=?`,
    params
  );

  return results;
};

const getUserByUsername = async (username) => {
  const user = await UserModel.findOne({ username });

  return user;
};

module.exports = { login, createUser, getUserByUsername };
