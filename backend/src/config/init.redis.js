const { createClient } = require("ioredis");
const { REDIS_HOST, REDIS_PORT } = require("./constant/Env");

const redisClient = createClient({
  host: REDIS_HOST,
  port: REDIS_PORT,
});
redisClient.ping(function (err, result) {
  console.log("Redis client ping result: ", result);
  console.log("Redis client ping errror: ", err);
});

redisClient.on("connect", () => {
  console.log("Redis client connected");
});

redisClient.on("error", (error) => {
  console.log("Redis client connected error: ", error);
});

module.exports = redisClient;
