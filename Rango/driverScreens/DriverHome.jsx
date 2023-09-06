import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import DriverMap from './DriverMap';
import DriverDetails from './DriverDetails';
import Sotp from './Sotp';
const passengerTab = createBottomTabNavigator();

function PassengerHome(){

    return(
        <passengerTab.Navigator>
            <passengerTab.Screen component={DriverDetails} name="DriverDetails"  options={{ headerShown: false }} />
            <passengerTab.Screen component={DriverMap} name="DriverMap"  options={{ headerShown: false }}/>
            <passengerTab.Screen component={Sotp} name="Sotp"  options={{ headerShown: false }}/>
        </passengerTab.Navigator>
    );
}

export default PassengerHome;