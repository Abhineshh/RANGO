const mongoose = require("mongoose");

const rideSchema = new mongoose.Schema({
    riderId: {
        type: String,
        required: true,
    },
    driverId: {
        type: String,
        required: true,
    },
    rangoId: {
        type: String,
        required: true,
    },
    rideStart: {
        type: Date,
        required: true,
    },
    rideEnd: {
        type: Date,
        required: true,
    },
    sotp: {
        type: Number,
        min: 4,
        max: 4,
    },
    eotp: {
        type: Number,
        min: 4,
        max: 4,
    },
    pickupLocation: {
        type: String,
        required: true,
    },
    destinationLocation: {
        type: String,
        required: true,
    },

});

module.export = mongoose.model("Ride", rideSchema);