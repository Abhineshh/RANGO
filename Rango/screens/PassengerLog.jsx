import React from 'react';
import {View,Text} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';

import Passengerlogin from './components/passengerComponents/Passengerlogin';
import Passengersignup from './components/passengerComponents/Passengersignup';

const stack =  createStackNavigator();

const Passenger = function(){
    return(
            <stack.Navigator>
                <stack.Screen name="Passengerlogin" component={Passengerlogin}/>
                <stack.Screen name="Passengersignup" component={Passengersignup}/>
            </stack.Navigator>
    );
}

export default Passenger;