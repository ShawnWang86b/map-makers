const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({
  path: { type: String, required: true },
});

const petSitterSchema = new mongoose.Schema(
  {
    address: { type: String, required: true },
    latitude: { type: String, required: true },
    longitude: { type: String, required: true },
    state: { type: String, required: true },
    postcode: { type: String, required: true },
    introduction: { type: String, required: true },
    abn: { type: String, required: true },
    //TODO: consider this service structure
    service: {
      serviceName: { type: String },
      description: { type: String },
      price: { type: String },
      timeRange: { type: String },
    },
    rating: { type: Number }, // how many star
    reviewsNumber: { type: Number }, // how many people attend review, e.g. (5)
    sales: { type: Number, default: 0 }, //how many time this pet sitter have orders
    policeCheck: { type: String, required: true },
    isPetSitter: { type: Boolean, default: false },
    images: [imageSchema],
    reviews: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Review",
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("PetSitter", petSitterSchema);
