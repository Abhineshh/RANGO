import React from 'react';
import {Text,View,TextInput,Button,StyleSheet,StatusBar, Linking} from 'react-native';
import Signup from './Signup';

const Login = function(){
    function handleChange(){
        
    }
    function handleLogin(){

    }
    return(
        <View style={styles.container}>
             <StatusBar animated={true} backgroundColor="#61dafb" />
            <Text style={styles.head}>LOGIN</Text>
            <Text>Enter your Email Id</Text>
            <TextInput style={styles.password} defaultValue='emailid' id='email' onChangeText={handleChange}/>
            <Text>Enter your password</Text>
            <TextInput style={styles.password} defaultValue="enter your password" id='password'/>
            <Button title='Login'/>
            <Text onPress={handleLogin()}>Create Account</Text>
        </View>
        
    );
}

const styles = StyleSheet.create({
    container:{
        paddingRight:'15%',
        paddingLeft:'15%',
        paddingTop:'15%',

    },
    head:{
        alignSelf:'center',
    },
    password:{
         height: 40,
          borderColor: 'gray',
          borderWidth: 1,
          borderColor:"green",
         borderWidth:1,
    },
});

export default Login;