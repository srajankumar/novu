// Import the Mongoose library
const mongoose = require("mongoose");

// Create a User Schema
const userSchema = mongoose.Schema(
  {
    // Name of the user
    name: {
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
      //   maxLength: [23, "Password must not exceed 23 characters"],
    },
    // URL for the user's profile photo
    photo: {
      type: String,
      required: [true, "Please add a photo"],
      default: "https://i.ibb.co/4pDNDk1/avatar.png",
    },
    // Phone number of the user
    phone: {
      type: String,
      required: [true, "Please add a phone number"],
      default: "+91",
    },
    // A brief biography of the user
    bio: {
      type: String,
      // Maximum length for the bio
      maxLength: [250, "Bio must not exceed 250 characters"],
      default: "Bio",
    },
  },
  {
    // Automatically add 'createdAt' and 'updatedAt' timestamps
    timestamps: true,
  }
);

// Create a User model based on the schema
const User = mongoose.model("User", userSchema);

// Export the User model for use in other parts of your application
module.exports = User;
