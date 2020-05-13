const mongoose = require("mongoose");
const OrderDetail = require("../models/OrderDetails.js");
const Product = require("../models/Products.js");

const middlewares = require("../mongoMiddlewares/Middlewares");

let Schema = mongoose.Schema;

let orderSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    status: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Orders", orderSchema);
