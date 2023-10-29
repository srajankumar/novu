import mongoose from "mongoose";

const DriverSchema = new mongoose.Schema(
  {
    // Name of the Driver
    username: {
      type: String,
      required: [true, "Please add a name"],
    },
    // Email of the user
    email: {
      type: String,
      required: [true, "Please add an email"],
      unique: true,
      trim: true,
      // Regular expression for email validation
      match: [
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Please enter a valid email",
      ],
    },
    // Password of the user
    password: {
      type: String,
      required: [true, "Please add a password"],
      // Password length constraints
      minLength: [6, "Password must be at least 6 characters"],
    },
    phone: {
      type: String,
      required: [true, "Please add a phone number"],
      default: "+91",
    },
    savedInfo: [{ type: mongoose.Schema.Types.ObjectId, ref: "drivers" }],

    // Additional Fields
    birthdate: {
      type: String,
      required: [true, "Please add a birthdate"],
    },
    imageUrl: {
      type: String,
      required: [true, "Please add an image URL"],
    },
    license: {
      type: Number,
      required: [true, "Please add a license number"],
    },
    busID: {
      type: String,
      required: [true, "Please add a bus ID"],
    },
    routeID: {
      type: String,
      required: [true, "Please add a route ID"],
    },
    experience: {
      type: Number,
      required: [true, "Please add experience in years"],
    },
    bio: {
      type: String,
      required: [true, "Please add a bio"],
    },
  },
  {
    // Automatically add 'createdAt' and 'updatedAt' timestamps
    timestamps: true,
  }
);

export const DriverModel = mongoose.model("drivers", DriverSchema);
