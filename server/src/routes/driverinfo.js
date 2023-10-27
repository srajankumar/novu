import express from "express";
// import mongoose from "mongoose";

// import { UserModel } from "../models/Users.js";
// import { verifyToken } from "./users.js";
import { DriverInfoModel } from "../models/DriverInfo.js";
import { DriverModel } from "../models/Drivers.js";

const router = express.Router();

router.get("/info", async (req, res) => {
  try {
    const response = await DriverInfoModel.find({});
    res.json(response);
  } catch (err) {
    res.json(err);
  }
});

router.post("/info", async (req, res) => {
  const info = new DriverInfoModel(req.body);
  try {
    const response = await info.save();
    res.json(response);
  } catch (err) {
    res.json(err);
  }
});

router.put("/info", async (req, res) => {
  try {
    const info = await DriverInfoModel.findById(req.body.infoID);
    const driver = await DriverModel.findById(req.body.driverID);
    driver.savedInfo.push(info);
    await driver.save();
    res.json({ savedInfo: driver.savedInfo });
  } catch (err) {
    res.json(err);
  }
});

router.get("/savedInfo/ids", async (req, res) => {
  try {
    const driver = await DriverModel.findById(req.params.userID);
    res.json({ savedInfo: driver?.savedInfo });
  } catch (err) {
    res.json(err);
  }
});

router.get("/savedInfo", async (req, res) => {
  try {
    const driver = await DriverModel.findById(req.params.driverID);
    const savedInfo = await DriverModel.find({
      _id: { $in: driver.savedInfo },
    });
    res.json({ savedInfo });
  } catch (err) {
    res.json(err);
  }
});
export { router as infoRouter };
