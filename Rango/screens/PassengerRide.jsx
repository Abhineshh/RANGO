import React from 'react';
import {} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Chooser from './components/passengerComponents/Chooser';
import PassengerRideDetails from './components/passengerComponents/PassengerRideDetails'
import PassengerMap from './components/passengerComponents/PassengerMap';
import PassengerOTP from './components/driverComponents/DriverOTP';
import Payments from './components/passengerComponents/Payment';

const Tab = createBottomTabNavigator();

const PassengerRide = function(){
    return(
        <Tab.Navigator>
            <Tab.Screen name="Chooser" component={Chooser}/>
            <Tab.Screen name="PassengerRideDetails" component={PassengerRideDetails}/>
            <Tab.Screen name="PassengerMap" component={PassengerMap}/>
            <Tab.Screen name="PassengerOTP" component={PassengerOTP}/>
            <Tab.Screen name="Payment" component={Payments}/>
        </Tab.Navigator>
    );
}

export default PassengerRide;