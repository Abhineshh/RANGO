import React,{useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AvailRide from './AvailRide';
import DriverDetails from './DriverDetails';
import DriverMap from './DriverMap';
import DriverReviews from './DriverReviews';
import Sotp from './Sotp';
import DriverHome from '../driverScreens/DriverHome';
import {NavigationContainer} from '@react-navigation/native';

const Stack = createNativeStackNavigator();  



function Driver(){

    return(
     
        <Stack.Navigator initialRouteName='AvailRide'>
             <Stack.Screen component={AvailRide} name="AvailRide"  options={{ headerShown: false }}/>
            <Stack.Screen component={DriverReviews} name="DriverReviews"  options={{ headerShown: false }}/>
            <Stack.Screen component={DriverHome} name='DriverHome' option={{headerShown:false}}/>
        </Stack.Navigator>
      
      
    );
}



export default Driver;