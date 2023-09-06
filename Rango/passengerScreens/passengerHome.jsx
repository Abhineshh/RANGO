import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import PassengerMap from './PassengerMap';
import PassengerDetails from './PassengerDetails';
import Eotp from './Eotp';
const passengerTab = createBottomTabNavigator();

function PassengerHome(){

    return(
        <passengerTab.Navigator>
            <passengerTab.Screen component={PassengerDetails} name="PassengerDetails"  options={{ headerShown: false }} />
            <passengerTab.Screen component={PassengerMap} name="PassengerMap"  options={{ headerShown: false }}/>
            <passengerTab.Screen component={Eotp} name="Eotp"  options={{ headerShown: false }}/>
        </passengerTab.Navigator>
    );
}

export default PassengerHome;