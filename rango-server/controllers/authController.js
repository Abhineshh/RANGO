const Rider = require("../models/userModel");
const Driver = require("../models/driverModel");
const bcrypt = require('bcrypt');


module.exports.driverlogin = async (req, res, next) => {
    try {
        const driverEmail = req.body.email;
        const driverPassword = req.body.password;
        console.log(driverEmail)
        console.log(driverPassword)
        const user = await Driver.findOne({ driverEmail });
        if (!user)
            return res.json({ msg: "Incorrect Username or Password", status: false });
        const isPasswordValid = await Driver.findOne({driverPassword})
        if (!isPasswordValid)
            return res.json({ msg: "Incorrect Username or Password", status: false });
        delete Driver.driverPassword;
        return res.json({ status: true, user });
    } catch (ex) {
        next(ex);
    }
};




module.exports.driversignup = async (req, res, next) => {
    try {
       
        const driverName = req.body.name;
        const driverEmail = req.body.email;
        const driverPassword = req.body.password;
         console.log(req.body)
        const Driveer = await Driver.create({
            driverName,
            driverEmail,
            driverPassword,
        });
        console.log(Driveer);
        delete Driveer.password;
        return res.json({ status: true, Driveer });
    } catch (err) { 
         return res.json({status:false})
        next(err)
    }
};


module.exports.passengerlogin = async (req, res, next) => {
    try {
        const riderEmail = req.body.email;
        const riderPassword = req.body.password;
        console.log('emailid',riderEmail)
        console.log('password',riderPassword)
        const user = await Rider.findOne({ riderEmail });
        if (!user)
            return res.json({ msg: "Incorrect Username or Password", status: false });
        const isPasswordValid = await Rider.findOne({riderPassword})
        if (!isPasswordValid)
            return res.json({ msg: "Incorrect Username or Password", status: false });
        delete Rider.riderPassword;
        return res.json({ status: true, user });
    } catch (ex) {
        next(ex);
    }
}

module.exports.passengersignup = async (req, res, next) => {
    try {
        const riderName = req.body.name;
        const riderEmail = req.body.email;
        const riderPassword = req.body.password;
        console.log('asdfsfd',req.body)
        console.log(riderName)
    
        const user = await Rider.create({
            riderName,
            riderEmail,
            riderPassword,
        });
        delete Rider.riderPassword;
        return res.json({ status: true, user });

    } catch (err) {
        console.log(err)
        return res.json({status:false})
        next(err)
    }
};

