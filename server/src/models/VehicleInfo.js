import mongoose from "mongoose";

// Define a MongoDB schema for vehicle information
const VehicleInfoSchema = new mongoose.Schema({
  vehicleID: {
    type: String,
    required: true,
  },
  model: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  plateNumber: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "drivers", // Reference to the drivers collection, assuming you have a drivers model
    required: true,
  },
});

// Create a VehicleInfo model based on the schema
export const VehicleInfoModel = mongoose.model(
  "VehicleInfo",
  VehicleInfoSchema
);
