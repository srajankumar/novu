const express = require("express");
const { registerUser } = require("../controllers/usercontroller");
const router = express.Router();

router.post("/register", registerUser);

module.exports = router;
