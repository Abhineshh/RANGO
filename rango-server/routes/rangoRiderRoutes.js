

const {
    Chooser,
    RiderDetails,
    TrackDriver,
    EndRideOTP,
    RiderWait,
    PassengerReview,
    PassengerCancel
} = require("../controllers/rideControllers");

const router = require('express').Router();


router.post('/Chooser',Chooser);
router.get('/getRiderWait',RiderWait)
router.get('/RiderDetails',RiderDetails);
router.get('/TrackDriver',TrackDriver);
router.post('/EndRideOTP',EndRideOTP);
router.post('/PassengerReview',PassengerReview);
router.post('/PassengerCancel',PassengerCancel);

module.exports = router;