// import express
const express = require("express");
const morgan = require("morgan");
const path = require("path");
const dateMoment = require("moment-timezone");

const app = express();

// Import env
if (process.env.NODE_ENV !== "production") {
  // eslint-disable-next-line global-require
  require("dotenv").config({ path: path.join(__dirname, "../.env") });
}

// Use morgan to debug log
morgan.token("date", (req, res, tz) => {
  return dateMoment().tz("Asia/Ho_Chi_Minh").format("DD-MM-YYYY, HH:mm:ss");
});

morgan.token("req_body", (req, res) => {
  return JSON.stringify(req.body);
});

morgan.token("resp_body", (req, res) => {
  return JSON.stringify(res.body);
});

app.use(
  morgan(
    ':date "req-origin: :remote-addr" ":method :url" "HTTP/:http-version" ":status" ":response-time ms"/ "req_body: :req_body" "resp_body: :resp_body"\n'
  )
);

// Import 3rd party libraries
const cors = require("cors");
// const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const cookieParser = require("cookie-parser");

const { PORT, FRONTEND_URL } = require("./config/constant/Env");
const { ResponseService } = require("./services");
const Error = require("./config/constant/Error");
const { globalErrorHandler } = require("./middlewares");
const { UserRouter, AuthRouter } = require("./routers");

// set security http headers
app.use(helmet());

// CORS for server and client communication
app.use(
  cors({
    origin: [`${FRONTEND_URL}`],
  })
);

// // set limit request from same API in timePeroid from same ip
// // set this limit to API calls only
// const limiter = rateLimit({
//   max: 120, // max number of limits
//   windowMs: 5 * 60 * 1000, // Banned 5 minutes
//   message: " Too many req from this IP , please Try  again in 5 minutes!",
//   standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
//   legacyHeaders: false, // Disable the `X-RateLimit-*` headers
//   skipSuccessfulRequests: true, // skip if the request is succesful
// });

// app.use("/api", limiter);

//  Body Parser  => reading data from body into req.body protect from scraping etc
// parses incoming requests with JSON payloads
// content-type: application/json
app.use(express.json({ limit: "10kb" }));

// Use to parse www-url-encoded
app.use(express.urlencoded({ extended: false }));

// Enable parsing cookies to read
app.use(cookieParser());

// Data sanitization against NoSql query injection
app.use(mongoSanitize()); // filter out the dollar signs protect from  query injection attack

// Data sanitization against XSS
app.use(xss()); // protect from molision code coming from html

// Test connection from the outside
app.use("/api/test", (req, res) => res.json({ data: "PEACE!!!!" }));

// Use specific Router to handle each end point
app.use("/api/user", UserRouter);
app.use("/api/auth", AuthRouter);

// handling all (get,post,update,delete.....) unhandled routes
app.use("*", (req, res, next) => {
  next(
    ResponseService.newError(
      Error.UrlNotFound.errCode,
      Error.UrlNotFound.errMessage
    )
  );
});

// error handling middleware
app.use(globalErrorHandler);

// Init db
// Connect to Mongoose
require("./config/init.mongo");

// Connect to Redis
require("./config/init.redis");

const port = PORT || 8080;

app.listen(port, () => {
  console.log(`Server listening on port ${port}.`);
});

// handle Globaly the unhandle Rejection Error which is  outside the express
// e.g database connection
process.on("unhandledRejection", (error) => {
  // it uses unhandledRejection event
  // using unhandledRejection event
  console.log(" Unhandled Rejection => shutting down now...");
  console.log(error.name, error.message);
  app.close(() => {
    process.exit(1); //  emidiatly exists all from all the requests sending OR pending
  });
});
