import React from 'react';
import {Text,View,TextInput,Button,StyleSheet,StatusBar, ScrollView} from 'react-native';

const Signup = function(){

    return(
        <ScrollView style={styles.container}>
             <StatusBar animated={true} backgroundColor="#61dafb" />
            <Text style={styles.head}>SIGN UP</Text>
            <Text>Enter your Name</Text>
            <TextInput style={styles.password} defaultValue='emailid' />
            <Text>Enter your Email</Text>
            <TextInput style={styles.password} defaultValue="enter your password" />
            <Text>Enter your PhoneNumber</Text>
            <TextInput style={styles.password} defaultValue="enter your password" />
            <Text>Enter your password</Text>
            <TextInput style={styles.password} defaultValue="enter your password" />

            <Button title='Login'/>
            <Text></Text>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
  container:{
        paddingRight:'15%',
        paddingLeft:'15%',

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

export default Signup;