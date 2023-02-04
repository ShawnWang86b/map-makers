const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    content: { type: String, required: true },
    rating: { type: Number, required: true },
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
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Review", reviewSchema);
