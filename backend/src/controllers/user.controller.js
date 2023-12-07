const { ResponseService, UserService } = require("../services");
const Error = require("../config/constant/Error");
const { catchAsync } = require("../utils");

const login = catchAsync(async (req, res) => {
  const { username, password } = req.body;
  const user = await UserService.login(username, password);

  res.status(200).json(ResponseService.newSucess());
});

const createNewUser = catchAsync(async (req, res) => {
  const { username, password, role } = req.body;
  const user = await UserService.createUser(username, password,role);
  res.status(200).json(ResponseService.newSucess(user));
});

const getUsername = catchAsync(async (req, res) => {
  const { username } = req.session;
  res.status(200).json(ResponseService.newSucess(username));
});

module.exports = { login, createNewUser, getUsername };
