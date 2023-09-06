const express = require("express");
const mongoose = require('mongoose');
const {DBConnect} = require('./DBConnect');
const DB_URL = process.env.MONGO_URL || `mongodb://127.0.0.1:27017/`;

const app = express();
app.use(express.json());


//DB 

DBConnect(DB_URL);

// the routes
const riderauthRoutes = require('./routes/riderRoutes');
const driverauthRoutes = require('./routes/driverRoutes');
const rangoRiderRoutes = require('./routes/rangoRiderRoutes');
const rangoDriverRoutes = require('./routes/rangoDriverRoutes')


//--------------------------------------------------------------



app.use('/riderauth',riderauthRoutes);
app.use('/driverauth',driverauthRoutes);
app.use('/rangoRider',rangoRiderRoutes);
app.use('/rangoDriver',rangoDriverRoutes);


app.listen(5000, () => {
  console.log(`Server is running on port 5000.`);
});