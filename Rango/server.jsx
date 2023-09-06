import React from 'react';
import {View,SafeAreaView} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Chooser from './passengerScreens/Chooser';


const Stack = createNativeStackNavigator();

function App(){
  return(
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Role">
          <Stack.Screen component={Chooser} name="Role"  options={{ headerShown: false }}/>
         
        </Stack.Navigator>
      </NavigationContainer>
  );
}

export default App;