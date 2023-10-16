const User = require("../models/user");
const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const router = express.Router();
router.post("/register", async (req, res) => {
  try {
    const { name, email, mobile, password } = req.body;
    const isNewUser = await User.findOne({ email });
    if (isNewUser) {
      return res.status(400).json({
        status: "FAILED",
        message: "user already exists",
      });
    }
    const encryptedPassword = await bcrypt.hash(password, 10);
    await User.create({ name, email, mobile, password: encryptedPassword });

    res.json({
      status: "SUCCESS",
      message: "user registered successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "FAILED",
      message: "user not register",
    });
  }
});
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      res.status.json({
        status: "FAILED",
        message: "invalid credentials",
      });
    }
    const passwordMatched = await bcrypt.compare(password, user.password);
    if (!passwordMatched) {
      res.status(500).json({
        status: "FAILED",
        message: "invalid credentials",
      });
    }
    const jwtToken = await jwt.sign(user.toJSON(), process.env.JWT_SECRET, {
      expiresIn: 600,
    });

    res.json({
      status: "SUCCESS",
      message: {
        name: user.name,
        jwtToken,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "FAILED",
      message: "user is not logged in",
    });
  }
});

module.exports = router;
