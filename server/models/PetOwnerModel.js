import { Schema } from "mongoose";

const petOwnerSchema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    userName: { type: String },
    password: { type: String, required: true },
    avatar: {
      type: String,
      default:
        "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    },
    phone: { type: String },
    roles: {
      type: [String],
      default: ["PetOwner"],
    },
    isActive: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);

petOwnerSchema.pre("save", function (next) {
  if (!this.userName) {
    this.userName = this.get("firstName");
  }

  next();
});

module.exports = mongoose.model("PetOwner", petOwnerSchema);
