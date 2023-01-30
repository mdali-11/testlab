const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  password: { type: String },
  purchase: { type: Boolean, default: false },
  test_series: [],
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

module.exports = User;
