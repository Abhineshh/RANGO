import React from 'react';
import {Text,View,TextInput,Button,StyleSheet,MapView} from 'react-native';
import Choosdest from '../components/Choosdest';
import ChooserPick from '../components/ChooserPick';
const Chooser = function(){

    return(
        <View>
            <Choosdest />
             <ChooserPick/>
            
            <Button title="Search Ride"
            color="#841584"
            />
        </View>
    );
}


export default Chooser;