const mongoose = require("mongoose");
let Schema = mongoose.Schema;

var date = new Date(); // Now

let chatbotSchema = new Schema(
  {
    name: {
      type: String,
      default: "Chatbot",
    },
    state: {
      type: Boolean,
      default: true,
    },
    platform: {
      type: [String],
      enum: {
        values: ["FACEBOOK", "TELEGRAM", "WHATSAPP", "INSTAGRAM"],
        message: "{VALUE} no es una plataforma válida",
      },
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "Users",
    },
    expirationDate: {
      type: Date,
      default: date.setDate(date.getDate() + 30), // Set now + 30 days as the new date
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Chatbots", chatbotSchema);
