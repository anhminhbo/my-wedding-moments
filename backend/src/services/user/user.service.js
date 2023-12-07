const { UserModel } = require("../../models");
const bcrypt = require("bcrypt");
const Error = require("../../config/constant/Error");

const createUser = async (username, password, role) => {
  // generate salt to hash password
  const salt = await bcrypt.genSalt(10);

  const hashedPassword = await bcrypt.hash(password, salt);

  const userToBeCreate = new UserModel({
    username,
    password: hashedPassword,
    role,
  });

  const user = await userToBeCreate.save();

  return user;
};

const login = async (username, password) => {
  const user = await UserModel.findOne({ username });
  if (!user) {
    throw ResponseService.newError(
      Error.UserNotFound.errCode,
      Error.UserNotFound.errMessage
    );
  }

  // check user password with hashed password stored in the database
  const validPassword = await bcrypt.compare(password, user.password);

  if (!validPassword) {
    throw ResponseService.newError(
      Error.PasswordInvalid.errCode,
      Error.PasswordInvalid.errMessage
    );
  }

  return;
};

const getUserByUsername = async (username) => {
  const user = await UserModel.findOne({ username });

  return user;
};

module.exports = { login, createUser, getUserByUsername };
