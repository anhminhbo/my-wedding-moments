// Router is responsible for routing URL endpoint to specific controller
// responsible for the requested action
// also the place where Browser will send request to first
const UserRouter = require("./user.router");
const AuthRouter = require("./auth.router");

module.exports = {
  UserRouter,
  AuthRouter,
};
