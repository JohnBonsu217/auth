const mongoose = require("mongoose");

const userDetailsSchema = new mongoose.Schema(
  {
    name: String,
    username: { unique: true, type: String },
    email: { unique: true, type: String },
    password: String,
    phoneNumber: String,
  },
  {
    collection: "UserDetails",
  }
);
mongoose.model("UserDetails", userDetailsSchema);
