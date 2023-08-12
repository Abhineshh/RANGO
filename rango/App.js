//Dependencies
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
//components
import PassengerOrDriver from './pages/Role';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Chooser from './pages/Choose';
import Loading from './components/Loading';

const stack = createStackNavigator();


export default function App() {




  return (
      <NavigationContainer>
      <stack.Navigator>
      <stack.Screen name="LoginScreen" component={Login}/>
      <stack.Screen name="SignupScreen" component={Signup}/>
      </stack.Navigator>
      </NavigationContainer>
  );
}

const styles = StyleSheet.create({
    container:{
     
    },
});
