import React from 'react';
import {} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import AvailRide from './components/driverComponents/AvailRide';
import DriverMap from './components/driverComponents/DriverMap';
import DriverOTP from './components/driverComponents/DriverOTP';
import DriverRideDetails from './components/driverComponents/DriverRideDetails'

const Tab = createBottomTabNavigator();

const DriverRide = function(){

    return(
        <Tab.Navigator initialRouteName='AvailRide'>
            <Tab.Screen name="AvailRide" component={AvailRide}/>
            <Tab.Screen name="DriverMap" component={DriverMap}/>
            <Tab.Screen name="DriverOTP" component={DriverOTP}/>
            <Tab.Screen name="DriverRideDetails" component={DriverRideDetails}/>
        </Tab.Navigator>
    );
}

export default DriverRide;