module.exports = {
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT,

  // Mongo
  MONGO_URL: process.env.MONGO_URL,

  // Redis
  REDIS_HOS: process.env.REDIS_HOST,
  REDIS_PORT: process.env.REDIS_PORT,

  // Frontend URL
  FRONTEND_URL: process.env.FRONTEND_URL,

  // Google Drive folders
  GROOM_FOLDER: process.env.GROOM_FOLDER,
  BRIDE_FOLDER: process.env.BRIDE_FOLDER,
  GENERAL_FOLDER: process.env.GENERAL_FOLDER,
  TEST_FOLDER: process.env.TEST_FOLDER,

  // Photos config
  PHOTOS_PER_PAGE: process.env.PHOTOS_PER_PAGE,
};
