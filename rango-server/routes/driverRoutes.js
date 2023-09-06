const {
    driverlogin,
    driversignup,
} = require("../controllers/authController");

const router = require("express").Router();

router.post("/driverlogin",driverlogin);
router.post("/driversignup",driversignup);


module.exports = router;