const mongoose = require("mongoose");

// Create a Category schema and model
const photoSchema = new mongoose.Schema(
  {
    gDriveId: String,
    name: String,
    gDriveUrl: String,
    index: Number,
    page: Number,
    category: String,
  },

  { minimize: false, timestamps: true } // for removing empty obj and add time stamp
);

module.exports = mongoose.model("Photos", photoSchema);
