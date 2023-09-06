

const {
    passengerlogin,
    passengersignup,
} = require("../controllers/authController");

const router = require("express").Router();

router.post("/passengerlogin",passengerlogin);
router.post("/passengersignup",passengersignup);



module.exports = router;