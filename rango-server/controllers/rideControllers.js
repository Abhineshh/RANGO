const Ride = require("../models/rideModel");


module.exports.Chooser = async(req,res,next) =>{
    try{
        console.log(req.body);
        console.log('ding ding');
        const pickup = req.body.pickup;
        const destination = req.body.destination;
        const tour = await Ride.create({
            riderEmail:"",
            driverEmail:"",
            rangoId:43,
            rideStart: '',
            rideEnd:"",
            sotp:8907,
            eotp:7654,
            pickup,
            destination,
        });
    }catch(err){
        console.log('chooserRouter: ',err)
    }
}

module.exports.RiderDetails = async(req,res,next) =>{
    try{
          return res.json({
            ding:'driversignup',
            num:23,
          })
        console.log('ding ding');
    }catch(err){
        console.log('RiderDetailsRouter: ',err)
    }
}

module.exports.TrackDriver= async(req,res,next) =>{
    try{
          return res.json({
            ding:'driversignup',
            num:23,
          })
        console.log('ding ding');
    }catch(err){
        console.log('TrackDriverRouter: ',err)
    }
}

module.exports.EndRideOTP = async(req,res,next) =>{
    try{
          
        console.log('ding ding');
    }catch(err){
        console.log('EndRideOTPRouter: ',err)
    }
}

module.exports.AvailableRides= async(req,res,next) =>{ 
    try{
          return res.json({
            ding:'driversigndASDASDASDDup',
            num:23,
          })
        console.log('ding ding');
    }catch(err){
        console.log('AvailableRidesRouter: ',err)
    }
}

module.exports.DriverChoosen= async(req,res,next) =>{
    try{
          
        console.log('ding ding');
    }catch(err){
        console.log('DriverChoosenRouter: ',err)
    }
}

module.exports.DriverDetails = async(req,res,next) =>{
    try{
          return res.json({
            ding:'driversignup',
            num:23,
          })
        console.log('ding ding');
    }catch(err){
        console.log('DriverDetailsRouter: ',err)
    }
}

module.exports.DriverLiveLocation = async(req,res,next) =>{
    try{
          
        console.log('ding ding');
    }catch(err){
        console.log('DriverLiveLocationRouter: ',err)
    }
}

module.exports.StartRideOTP = async(req,res,next) =>{
    try{
        
        console.log('ding ding');
    }catch(err){
        console.log('StartRideOTPRouter: ',err)
    }
}
