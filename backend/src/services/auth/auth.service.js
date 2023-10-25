const UserService = require("../user/user.service");
const ResponseService = require("../response/response.service");
const Error = require("../../config/constant/Error");
const { UserModel } = require("../../models");

const register = async (username, password) => {
  // generate salt to hash password

  const user = await UserService.createUser(username, hashedPassword);

  return;
};

const login = async (username, password) => {
  const user = await UserService.getUserByUsername(username);
  if (!user) {
    throw ResponseService.newError(
      Error.UserNotFound.errCode,
      Error.UserNotFound.errMessage
    );
  }

  // check user password with hashed password stored in the database

  if (!validPassword) {
    throw ResponseService.newError(
      Error.PasswordInvalid.errCode,
      Error.PasswordInvalid.errMessage
    );
  }

  return user;
};

const changePassword = async (username, oldPassword, newPassword) => {
  const user = await UserService.getUserByUsername(username);
  if (!user) {
    throw ResponseService.newError(
      Error.UserNotFound.errCode,
      Error.UserNotFound.errMessage
    );
  }

  // check user password with hashed password stored in the database

  // check new password with hashed password stored in the database

  if (!validPassword) {
    throw ResponseService.newError(
      Error.PasswordInvalid.errCode,
      Error.PasswordInvalid.errMessage
    );
  }

  if (validNewPassword) {
    throw ResponseService.newError(
      Error.NewPasswordInvalid.errCode,
      Error.NewPasswordInvalid.errMessage
    );
  }

  // Filter username to update password
  // generate salt to hash password

  const filter = { username };
  const update = { password: hashedNewPassword };

  await UserModel.findOneAndUpdate(filter, update, {
    new: true,
  });

  return;
};
module.exports = { register, login, changePassword };
