import React from 'react';
import {Text,View,TextInput,Button,StyleSheet} from 'react-native';

const Login = function(){

    return(
        <View>
            <Text>Enter your Email Id</Text>
            <TextInput style={{
                borderColor:"green",
                borderWidth:1,
                }} defaultValue='emailid' />
            <TextInput
        style={{
          height: 40,
          borderColor: 'gray',
          borderWidth: 1,
        }}
        defaultValue="You can type in me"
      />
             <Text>Enter your passwaord</Text>
            <TextInput title='the password'/>
            <Button title='Login'/>
            <Text>no Account Sign up</Text>
        </View>
    );
}

const styles = StyleSheet.create({

});

export default Login;