
const {
    AvailableRides,
    DriverChoosen,
    DriverDetails,
    DriverLiveLocation,
    StartRideOTP
} = require("../controllers/rideControllers");

const router = require('express').Router();


router.get('/AvailableRides',AvailableRides);
router.post('/DriverChoosen',DriverChoosen);
router.get('/DriverDetails',DriverDetails);
router.put('/DriverLiveLocation',DriverLiveLocation);
router.post('/StartRideOTP',StartRideOTP);

module.exports = router;