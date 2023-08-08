import mongoose from "mongoose";

const rideSchema = new mongoose.Schema({
    userId:{
        type:String,
        required:true,
    },
    driverId:{
        type:String,
        required:true,
    },
    rideTime:{
        rideStart:{
            type:Date,
            required:true,
        },
        rideEnd:{
            type:Date,
            required:true,
        },
    },
    otp:{
        sotp:{
            type:Number,
            min:4,
            max:4,
        },
          eotp:{
            type:Number,
            min:4,
            max:4,
        },
        required:true,
    },
    location:{
        pickup:{
            type:String,
            required:true,
        },
        destination:{
            type:String,
            required:true,
        },
    },
});

module.export = mongoose.model("Ride",rideSchema);