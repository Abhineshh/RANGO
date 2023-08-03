import React from 'react';
import {Text,View,TextInput,Button,StyleSheet} from 'react-native';

const Login = function(){

    return(
        <View style={styles.container}>
           <Text>Choose Pickup and Destination</Text>
           <View>
            <Text>Enter Pickup Location</Text>
            <TextInput>pickup</TextInput>
           <TextInput>PickUP</TextInput>
           </View>
        </View>
    );
}

const styles = StyleSheet.create({
container:{
    backgroundColor:'#fff',
}
});

export default Login;