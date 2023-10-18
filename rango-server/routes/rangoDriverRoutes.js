
const {
    AvailableRides,
    DriverChoose,
    DriverDetails,
    DriverLiveLocation,
    StartRideOTP,
    DriverReview,
    DriverCancel,
    DriverRideEnd,
} = require("../controllers/rideControllers");

const router = require('express').Router();


router.get('/AvailableRides',AvailableRides);
router.post('/DriverChoose',DriverChoose);
router.get('/DriverDetails',DriverDetails);
router.put('/DriverLiveLocation',DriverLiveLocation);
router.post('/StartRideOTP',StartRideOTP);
router.get('/DriverReview',DriverReview);
router.post('/DriverCancel',DriverCancel);
router.post('/DriverRideEnd',DriverRideEnd);

module.exports = router;