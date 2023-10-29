import express from "express";
// serve our frontend to create an api with node js
import cors from "cors";
// setup rules to communicate between front end and back end
import mongoose from "mongoose";
// orm for mongodb
import dotenv from "dotenv";
// seting up environment variable for database
dotenv.config();
// making env available throughout the app
import { userRouter } from "./routes/users.js";
import { driverRouter } from "./routes/drivers.js";
import { infoRouter } from "./routes/driverinfo.js";

const app = express();

app.use(express.json());
// get data in json format from the frontend
app.use(cors());
app.use("/auth", userRouter);
app.use("/driver", driverRouter);
app.use("/driver", infoRouter);

// auth == endpoint route related to the authentications, and these will be in users.js

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const port = process.env.PORT || 3001;

app.listen(port, () =>
  console.log(`Server running on ${port}, http://localhost:${port}`)
);
