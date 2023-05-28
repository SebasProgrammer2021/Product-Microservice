const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  code: {
    type: Number
  },
  name: {
    type: String
  },
  price: {
    type: Number
  },
});

module.exports = mongoose.model("Product", productSchema);
