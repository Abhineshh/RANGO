import React from 'react';
import {View,Text,TextInput,Button} from 'react-native';

const Choosdest = function(){

    return(
        <View>
            <Text>Choose pickup and destination</Text>
            <View id='pickup-location'>
                <TextInput defaultValue='enter Pickup location'></TextInput>
                <Button title='choose on map'/>
            </View>
        </View>
    );
}

export default Choosdest;