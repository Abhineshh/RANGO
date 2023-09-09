import React from 'react';
import {View,SafeAreaView} from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Passengerlogin from './Passengerlogin';
import Passengersignup from './Passengersignup';
import Passenger from './Passenger';
import ChooserMap from './ChooserMap';

const Stack = createNativeStackNavigator();

function InitPassenger(){
  return(
        <Stack.Navigator initialRouteName="Passengerlogin">
          <Stack.Screen component={Passengerlogin} name="Passengerlogin"  options={{ headerShown: false }}/>
          <Stack.Screen component={Passengersignup} name="Passengersignup"  options={{ headerShown: false }}/>
          <Stack.Screen component={Passenger} name="Passenger" options={{ headerShown: false }}/>
        </Stack.Navigator>
     
  );
}

export default InitPassenger;