const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    sub_total: { type: Number, require: true },
    phone_number: { type: Number, require: true },
  },
  { timestamps: true }
);

const OrderModel = mongoose.model("event", orderSchema);

module.exports = {
  OrderModel,
};
