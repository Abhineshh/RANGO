import React from 'react';
import {View,SafeAreaView} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import InitDriver from './driverScreens/initDriver';
import InitPassenger from './passengerScreens/initPassenger';
import Role from './role';
import { ParamProvider } from './ParamContext';

const Stack = createNativeStackNavigator();

function App(){
  return(
      <NavigationContainer>
        <ParamProvider>
        <Stack.Navigator initialRouteName="Role">
          <Stack.Screen component={Role} name="Role"  options={{ headerShown: false }}/>
          <Stack.Screen component={InitPassenger} name="InitPassenger"  options={{ headerShown: false }}/>
          <Stack.Screen component={InitDriver} name="InitDriver" options={{ headerShown: false }} />
        </Stack.Navigator>
        </ParamProvider>
      </NavigationContainer>
  );
}

export default App;