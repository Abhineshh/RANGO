

const {
    Chooser,
    RiderDetails,
    TrackDriver,
    EndRideOTP
} = require("../controllers/rideControllers");

const router = require('express').Router();


router.post('/Chooser',Chooser);
router.get('/RiderDetails',RiderDetails);
router.get('/TrackDriver',TrackDriver);
router.post('/EndRideOTP',EndRideOTP);


module.exports = router;