const mongoose = require("mongoose");

const rideSchema = new mongoose.Schema({
    riderEmail: {
        type: mongoose.Schema.Types.ObjectId, // rango passenger
        ref: 'Rider',
        required: true,
    },
    driverEmail: {
        type: mongoose.Schema.Types.ObjectId, //rango driver
        ref: 'Driver',
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
        type: Number,  // start time otp
        min: 4,
        max: 4,
    },
    eotp: { // start time otp
        type: Number,
        min: 4,
        max: 4,
    },
    pickupLocation: { //pickup Coordinates
        type: Array,
        required: true,
    },
    destinationLocation: { // destination Coordinates
        type: Array,
        required: true,
    },

});

module.export = mongoose.model("Ride", rideSchema);