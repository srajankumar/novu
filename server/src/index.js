import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
import { userRouter } from "./routes/users.js";
import { driverRouter } from "./routes/drivers.js";
import { infoRouter } from "./routes/driverinfo.js";

// Create an Express application
const app = express();

// Use middleware to handle JSON data and CORS
app.use(express.json());
app.use(cors());

// Define routes for authentication, drivers, and driver information
app.use("/auth", userRouter); // Authentication-related routes
app.use("/driver", driverRouter); // Routes for drivers
app.use("/driver", infoRouter); // Routes for driver information

// Connect to MongoDB using the provided URI
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define the port for the server, using the provided port or defaulting to 3001
const port = process.env.PORT || 3001;

// Start the server and listen on the specified port
app.listen(port, () =>
  console.log(`Server running on port ${port}, http://localhost:${port}`)
);
