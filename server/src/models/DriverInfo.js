import mongoose from "mongoose";

const DriverInfoSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  birthdate: { type: String, required: true },
  phone: { type: Number, required: true },
  imageUrl: { type: String, required: true },
  license: { type: String, required: true },
  busID: { type: String, required: true },
  routeID: { type: String, required: true },
  experience: { type: Number, required: true },
  bio: { type: String, required: true },
  userOwner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "drivers",
    required: true,
  },
});

export const DriverInfoModel = mongoose.model("DriverInfo", DriverInfoSchema);
