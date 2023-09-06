const Rider = require("../models/userModel");
const Driver = require("../models/driverModel");
const bcrypt = require('bcrypt');

module.exports.driverlogin = async (req, res, next) => {
    try {
        



    } catch (err) {
        console.log(err)
        next(e)
    }
};




module.exports.driversignup = async (req, res, next) => {
    try {
        return res.json({
            ding: 'driversignup',
            num: 23,
        })
    } catch (err) {
        console.log(err)
        next(e)
    }
};


module.exports.passengerlogin = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const result = await Rider.create({
            email,
            password
        });

        res.send('don dong')
    } catch (err) {
        console.log(err)
        next(e)
    }
}

module.exports.passengersignup = async (req, res, next) => {
    try {
        return res.json({
            ding: 'passengersignup',
            num: 23,


        })
    } catch (err) {
        console.log(err)
        next(e)
    }
}

