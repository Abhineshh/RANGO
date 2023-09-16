
const {
    AvailableRides,
    DriverChoose,
    DriverDetails,
    DriverLiveLocation,
    StartRideOTP
} = require("../controllers/rideControllers");

const router = require('express').Router();


router.get('/AvailableRides',AvailableRides);
router.post('/DriverChoose',DriverChoose);
router.get('/DriverDetails',DriverDetails);
router.put('/DriverLiveLocation',DriverLiveLocation);
router.post('/StartRideOTP',StartRideOTP);

module.exports = router;