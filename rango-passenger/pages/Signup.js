import React from 'react';
import {Text,View,TextInput,Button,StyleSheet} from 'react-native';

const Signup = function(){

    return(
        <View>
            <Text>Sign Up</Text>
            <Text>Enter your Email Id</Text>
            <TextInput> the email id</TextInput>
             <Text>Enter your passwaord</Text>
            <TextInput> the password</TextInput>
            <Button>Login</Button>
            <Text>Alreadt have a Account then login</Text>
        </View>
    );
}

const styles = StyleSheet.create({

});

export default Signup;