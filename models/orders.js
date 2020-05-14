const mongoose = require("mongoose");
const OrderDetail = require("../models/OrderDetails.js");

let Schema = mongoose.Schema;

let validStates = {
  values: ["TODO", "DOING", "DONE"],
  message: "{VALUE} no es un estado válido",
};

let orderSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    state: {
      type: String,
      default: "TODO",
      enum: validStates,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Orders", orderSchema);
