const mongoose = require("mongoose");

let Schema = mongoose.Schema;

let orderDetailSchema = new Schema({
  orderId: {
    type: Schema.Types.ObjectId,
    ref: "Orders",
    required: true,
  },
  dishId: {
    type: Schema.Types.ObjectId,
    ref: "Dishes",
    required: [true, "El plato es requerido"],
  },
  qty: Number,
});

module.exports = mongoose.model("OrderDetails", orderDetailSchema);
