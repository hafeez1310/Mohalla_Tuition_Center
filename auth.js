const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET; // Change this to a secure key

// Define User Schema (if not already defined)
const User = mongoose.model("User", new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: String
}));

// 🟢 Login Route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // 1️⃣ Find the user in the database
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found!" });
    }

    // 2️⃣ Compare entered password with hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials!" });
    }

    // 3️⃣ Generate JWT token
    const token = jwt.sign({ userId: user._id, role: user.role }, JWT_SECRET, { expiresIn: "1h" });

    res.json({ message: "Login successful!", token });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

module.exports = router;
