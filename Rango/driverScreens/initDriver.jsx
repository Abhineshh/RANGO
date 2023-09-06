import React from 'react';
import {View,SafeAreaView} from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Driver from './Driver';
import Driverlogin from './Driverlogin';
import Driversignup from './Driversignup';

const Stack = createNativeStackNavigator();

function InitDriver(){
  return(
      <Stack.Navigator initialRouteName='Driverlogin'>
          <Stack.Screen component={Driverlogin} name="Driverlogin"  options={{ headerShown: false }}/>
          <Stack.Screen component={Driversignup} name="Driversignup"  options={{ headerShown: false }}/>
          <Stack.Screen component={Driver} name="Driver"  options={{ headerShown: false }}/>
      </Stack.Navigator>
  );
}

export default InitDriver;