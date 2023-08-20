const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
    min: 3,
    max: 20,
    unique: true,
  },
  userEmail: {
    type: String,
    required: true,
    unique: true,
    max: 50,
  },
  userPassword: {
    type: String,
    required: true,
    min: 8,
  },
  userId:{
    type:String,
    required:true,
  },
  UserPhoneNumber:{
    type:Number,
    min:10,
    max:10,
    unique:true,
  },
});

module.exports = mongoose.model("Users", userSchema);
