
const {
    AvailableRides,
    DriverChoosen,
    DriverDetails,
    DriverLiveLocation,
    StartRideOTP
} = require("../controllers/rideControllers");

const router = require('express').Router();


router.get('/AvailableRides',AvailableRides);
router.put('/DriverChoosen',DriverChoosen);
router.get('/DriverDetails',DriverDetails);
router.put('/DriverLiveLocation',DriverLiveLocation);
router.post('/StartRideOTP',StartRideOTP);

module.exports = router;