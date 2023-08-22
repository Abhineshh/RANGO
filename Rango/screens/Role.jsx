import React from 'react';
import {View,Text,Button} from 'react-native';
import DriverLog from './DriverLog';
import PassengerLog from './PassengerLog';
const Role = function({navigation}){

   
    return(
        <View>
           <Button onPress={()=>{navigation.navigate('DriverLog')}} title="I am  a Driver"/>
           <Button onPress={()=>navigation.navigate('PassengerLog')} title="I am  a Passenger"/>
        </View>
    );
}

export default Role;