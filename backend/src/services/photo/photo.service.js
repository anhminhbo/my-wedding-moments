const PhotoService = require("../photo/photo.service");
const ResponseService = require("../response/response.service");
const Error = require("../../config/constant/Error");
const { PhotoModel } = require("../../models");

const register = async (username, password) => {
  // generate salt to hash password

  const photo = await PhotoService.createPhoto(username, hashedPassword);

  return;
};

const login = async (username, password) => {
  const photo = await PhotoService.getPhotoByPhotoname(username);
  if (!photo) {
    throw ResponseService.newError(
      Error.PhotoNotFound.errCode,
      Error.PhotoNotFound.errMessage
    );
  }

  // check photo password with hashed password stored in the database

  if (!validPassword) {
    throw ResponseService.newError(
      Error.PasswordInvalid.errCode,
      Error.PasswordInvalid.errMessage
    );
  }

  return photo;
};

const changePassword = async (username, oldPassword, newPassword) => {
  const photo = await PhotoService.getPhotoByPhotoname(username);
  if (!photo) {
    throw ResponseService.newError(
      Error.PhotoNotFound.errCode,
      Error.PhotoNotFound.errMessage
    );
  }

  // check photo password with hashed password stored in the database

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

  await PhotoModel.findOneAndUpdate(filter, update, {
    new: true,
  });

  return;
};
module.exports = { register, login, changePassword };
