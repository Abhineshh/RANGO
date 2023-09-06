const mongoose = require("mongoose");

const driverSchema = new mongoose.Schema({
    driverName: {
    type: String,
    required: true,
    min: 3,
    max: 20,
    unique: true,
  },
  driverEmail: {
    type: String,
    required: true,
    unique: true,
    max: 50,
  },
  driverPassword: {
    type: String,
    required: true,
    min: 8,
  },
  driverId:{
    type:String,
    required:true,
  },
});

module.exports = mongoose.model("Driver", driverSchema);
