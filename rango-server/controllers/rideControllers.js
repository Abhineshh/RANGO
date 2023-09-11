const RideTour = require("../models/ridetourModel");
const otpGenetator = require("otp-generator");

module.exports.Chooser = async (req, res, next) => {
    try {
        console.log(req.body);
        console.log('ding ding');
        const pickup = req.body.pickup;
        const destination = req.body.Destination;
        const rideremail = req.body.rideremail;
        const riderid = req.body.rideid;
        console.log(pickup," ",destination," ",rideremail," ",riderid)

        const startotp = otpGenetator.generate(4, {
            digits: true,
            upperCaseAlphabets: false,
            lowerCaseAlphabets: false,
            specialChars: false,
        });
        const endotp = otpGenetator.generate(4, {
            digits: true,
            upperCaseAlphabets: false,
            lowerCaseAlphabets: false,
            specialChars: false,
        });
        console.log(startotp, " ", endotp)

        const tour = await RideTour.create({
            riderEmail: rideremail,
            driverEmail: "nil",
            rangoId: riderid,
            rideStart: false,
            rideEnd: false,
            sotp: startotp,
            eotp: endotp,
            pickupLocation: pickup,
            destinationLocation: destination,
        });

        res.json({ status: true, tour })

    } catch (err) {

        res.json({ status: false });
        console.log(err)
        next(err);
    }
}

module.exports.RiderWait = async (req, res, next) => {
    try {
        const data = req.query.params;
        console.log("the loading Screen",data)
        const selected = await RideTour.where("rangoId").equals(data)
        if (!selected) {
            res.json({ status: false });
        }
        if(selected) {
            const d = await RideTour.findOne({ driverEmail: { $ne: 'nil' } })
            if (!d) {
                res.json({ status: true, selected })
            }
            if (d) {
                res.json({ status: false })
            }
        }
    } catch (err) {
        next(err);
    }
}

module.exports.RiderDetails = async (req, res, next) => {
    try {
        return res.json({
            ding: 'driversignup',
            num: 23,
        })
        console.log('ding ding');
    } catch (err) {
        console.log('RiderDetailsRouter: ', err)
    }
}

module.exports.TrackDriver = async (req, res, next) => {
    try {
        return res.json({
            ding: 'driversignup',
            num: 23,
        })
        console.log('ding ding');
    } catch (err) {
        console.log('TrackDriverRouter: ', err)
    }
}

module.exports.EndRideOTP = async (req, res, next) => {
    try {

        console.log('ding ding');
    } catch (err) {
        console.log('EndRideOTPRouter: ', err)
    }
}

module.exports.AvailableRides = async (req, res, next) => {
    try {
        const Available = await RideTour.find({ rideStart: { $ne: true } });
        console.log(Available)
        if (Available) {
        
            res.json({ status: true, Available })
            console.log('kling')
        }
        if (!Available) {
            res.json({ status: false });
            console.log('dunk')
        }

        console.log('ding ding');
    } catch (err) {
        res.json({ status: false })
        next(err)
    }
}

module.exports.DriverChoosen = async (req, res, next) => {
    try {

        console.log('ding ding');
    } catch (err) {
        console.log('DriverChoosenRouter: ', err)
    }
}

module.exports.DriverDetails = async (req, res, next) => {
    try {
        return res.json({
            ding: 'driversignup',
            num: 23,
        })
        console.log('ding ding');
    } catch (err) {
        console.log('DriverDetailsRouter: ', err)
    }
}

module.exports.DriverLiveLocation = async (req, res, next) => {
    try {

        console.log('ding ding');
    } catch (err) {
        console.log('DriverLiveLocationRouter: ', err)
    }
}

module.exports.StartRideOTP = async (req, res, next) => {
    try {

        console.log('ding ding');
    } catch (err) {
        console.log('StartRideOTPRouter: ', err)
    }
}
