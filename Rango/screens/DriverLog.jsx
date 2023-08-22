import React from 'react';
import {View,Text} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';

import Driverlogin from './components/driverComponents/Driverlogin';
import Driversignup from './components/driverComponents/Driversignup';

const stack=createStackNavigator();

const Driver = function(){
    return(
            <stack.Navigator>
                <stack.Screen name="Driverlogin" component={Driverlogin}/>
                <stack.Screen name="Driversignup" component={Driversignup}/>
            </stack.Navigator>
    );
}

export default Driver;