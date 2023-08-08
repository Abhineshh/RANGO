import React from 'react';
import {View,Text,TextInput,Button} from 'react-native';

const ChooserPick = function(){
    return(
        <View id='destination-location'>
                 <TextInput defaultValue='enter destination location'/>
                <Button title='choose on map'/>
            
        </View>
    );
}

export default ChooserPick;