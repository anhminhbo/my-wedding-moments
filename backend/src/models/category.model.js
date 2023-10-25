const mongoose = require("mongoose");

// Create a Category schema and model
const categorySchema = new mongoose.Schema({
  name: String,
  parentCategory: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
  // attributes: [
  //   { name: String, required: Boolean, value: mongoose.Schema.Types.Mixed },
  // ],
});

module.exports = mongoose.model("Category", categorySchema);
