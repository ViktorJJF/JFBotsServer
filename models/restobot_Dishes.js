const mongoose = require("mongoose");
let Schema = mongoose.Schema;

let dishSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "El nombre del plato es requerido"],
    },
    price: String,
    img: String,
    typeId: {
      type: Schema.Types.ObjectId,
      ref: "Orders",
    },
    description: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Dishes", dishSchema);
