import React from 'react';
import {View,Button,Text,} from 'react-native';



export default function PassengerOrDriver(){
    function handleChange(decision){
        if(decision== 'p'){

        }
    }

    return(
        <View>
            <Text>ARE YOU?</Text>
            <Button title="passenger" onPress={handleChange('p')}/>
            <Button title="Driver" />
        </View>
    );
};

 //PassengerOrDriver;