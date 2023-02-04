const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    petOwner: {
      _id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "PetOwner",
      },
    },
    petSitter: {
      _id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "PetSitter",
      },
    },
    orderTotal: {
      serviceCount: { type: Number, require: true }, //TODO: not clear
      serviceSubtotal: { type: Number, required: true },
    },
    cartItems: [
      {
        serviceName: { type: String, required: true },
        price: { type: Number, required: true },
        image: { path: { type: String, required: true } }, // this image is one image for a service
        quantity: { type: Number, required: true },
      },
    ],
    transactionResult: {
      status: { type: String },
      createTime: { type: String },
      amount: { type: Number }, //TODO: not clear
    },
    isPaid: {
      type: Boolean,
      required: true,
      default: false,
    },
    PaidAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Order", orderSchema);
