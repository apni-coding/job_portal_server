const mongoose = require('mongoose');

// Define the schema for OTP model
const otpSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  otp: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 600 // TTL index for 10 minutes expiry
  }
});

// Create a Mongoose model based on the schema
const otpModel = mongoose.model('OTP', otpSchema);

module.exports = {otpModel};
