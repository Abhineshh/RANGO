import React,{useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Chooser from './Chooser';
import PassengerDetails from './PassengerDetails';
import PassengerMap from './PassengerMap';
import PassengerReview from './PassengerReview';
import Payments from './Payments';
import { NavigationContainer } from '@react-navigation/native';
import PassengerHome from './passengerHome';
import LoadingScreen from './loadingScreen';


const PassengerStack = createNativeStackNavigator();

function Passenger(){
    return(
        <PassengerStack.Navigator initialRouteName='Chooser'>
                <PassengerStack.Screen component={Chooser} name="Chooser"  options={{ headerShown: false }}/>
                <PassengerStack.Screen component={PassengerHome} name="PassengerHome" option={{headerShown:false}}/>
                <PassengerStack.Screen component={PassengerReview} name="PassengerReview"  options={{ headerShown: false }}/>
                <PassengerStack.Screen component={Payments} name="Payments"  options={{ headerShown: false }}/>
                <PassengerStack.Screen component={LoadingScreen} name='LoadingScreen' options={{headerShown:false}}/>
        </PassengerStack.Navigator>
    );
}



export default Passenger;
