const { ResponseService, UserService, RedisService } = require("../services");
const Error = require("../config/constant/Error");
const { catchAsync } = require("../utils");

const login = catchAsync(async (req, res) => {
  const { username, password } = req.body;
  const user = await UserService.login(username, password);

  res.status(200).json(ResponseService.newSucess(user));
});

const createNewUser = catchAsync(async (req, res) => {
  const { username, password } = req.body;
  const user = await UserService.getUserByUsername(username);
  if (user) {
    throw ResponseService.newError(
      Error.UserAlreadyExists.errCode,
      Error.UserAlreadyExists.errMessage
    );
  }
  const newUser = await UserService.createUser(username, password);
  res.status(200).json(ResponseService.newSucess(newUser));
});

const getUsername = catchAsync(async (req, res) => {
  const { username } = req.session;
  res.status(200).json(ResponseService.newSucess(username));
});

module.exports = { login, createNewUser, getUsername };
