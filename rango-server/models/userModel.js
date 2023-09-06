const mongoose = require("mongoose");

const riderSchema = new mongoose.Schema({
  riderName: {
    type: String,
    required: true,
    min: 3,
    max: 20,
    unique: true,
  },
  riderEmail: {
    type: String,
    required: true,
    unique: true,
    max: 50,
  },
  riderPassword: {
    type: String,
    required: true,
    min: 8,
  },
  riderId:{
    type:String,
    required:true,
  },
});

module.exports = mongoose.model("Rider", riderSchema);
