const mongoose = require("mongoose");
let Schema = mongoose.Schema;

let dishesTypesSchema = new Schema(
  {
    name: {
      type: String,
      unique: true,
      required: [true, "El nombre es requerido"],
    },
    isMenu: {
      type: Boolean,
      default: false,
    },
  },

  {
    timestamps: true,
  }
);

module.exports = mongoose.model("DishesTypes", dishesTypesSchema);
