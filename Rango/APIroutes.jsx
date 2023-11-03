export const ser = "http://10.0.2.2:5000";
export const server = "http://192.168.9.123:5000"
export const passengerloginRoute = `${server}/riderauth/passengerlogin`;
export const passengersignupRoute = `${server}/riderauth/passengersignup`;


export const driverloginRoute = `${server}/driverauth/driverlogin`;
export const driversignupRoute = `${server}/driverauth/driversignup`;


export const ChooserRoute = `${server}/rangoRider/Chooser`; //rangoid is created  post
export const getRiderWait = `${server}/rangoRider/getRiderWait`;
export const RiderDetailsRoute = `${server}/rangoRider/RiderDetails`; // get
export const TrackDriverRoute = `${server}/rangoRider/TrackDriver`; // get
export const EndRideOTP = `${server}/rangoRider/EndRideOTP`; // post


export const  AvailRideRoute = `${server}/rangoDriver/AvailableRides`; //get once created display in availride to the driver if ridenot started
export const ChoosenDriverRoute = `${server}/rangoDriver/DriverChoose`;// post
export const DriverDetailsRoute = `${server}/rangoDriver/DriverDetails`; // get
export const DriverLiveLocation = `${server}/rangoDriver/DriverLiveLocation`; //put
export const StartRideOTP = `${server}/rangoDriver/StartRideOTP`; // post

//review apis
export const PassengerReviewRoute = `${server}/rangoRider/PassengerReview`;
export const DriverReviewRoute = `${server}/rangoDriver/DriverReview`;


//Cancel Ride API's

export const PassengerCancel = `${server}/rangoRider/PassengerCancel`;
export const DriverCancel =  `${server}/rangoDriver/DriverCancel`;

//Ride End Api's for only driver

export const DriverRideEnd = `${server}/rangoDriver/DriverEndRide`;
