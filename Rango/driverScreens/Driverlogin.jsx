import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    Alert,
    Text,
    View,
    TextInput,
    TouchableOpacity,
} from 'react-native';
import axios from 'axios';
import Passenger from './Driver';
import Passengersignup from './Driversignup';
import { driverloginRoute } from '../APIroutes';

const Driverlogin = function ({ navigation }) {
    const [Driver, setDriver] = useState({ Email: "", password: ""});

     const handleValidation= () => {
        const { email, password} = Driver;
        if (password === "") {
            Alert.alert("Email and Password is required.");
            return false;
        } else if(email === ""){
            Alert.alert("Email and Password is required.");
            return false;
        }
        return true;
    };

    function navigating(){
        navigation.navigate('Driver');
    }


       async function gettheDriver(){
            try{
                if(handleValidation()){
                const useeer = await axios.post(driverloginRoute,Driver)
                console.log(useeer.status , 'was the response status \n' );
                  if(useeer.data.status=== false){
                    Alert.alert(`couldn't login`);
                }
                if(useeer.data.status === true){
                   
                    navigating();
                }
                }
        }catch(e){
            console.log(e);
        }
       }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>DRIVER LOG-IN</Text>
            <View style={styles.inputView}>
                <TextInput
                    style={styles.inputText}
                    placeholder="Email"
                    placeholderTextColor="#003f5c"
                    onChangeText={text => {
                        Driver.email = text
                        setDriver({ ...Driver })
                    }} />
            </View>
            <View style={styles.inputView}>
                <TextInput
                    style={styles.inputText}
                    secureTextEntry
                    placeholder="Password"
                    placeholderTextColor="#003f5c"
                    onChangeText={text => {
                        Driver.password = text
                        setDriver({ ...Driver })
                    }} />
            </View>

            <TouchableOpacity
                onPress={() => {gettheDriver()}}
                style={styles.loginBtn}>
                <Text style={styles.loginText}>LOGIN </Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => { navigation.navigate('Driversignup') }}>
                <Text style={styles.forgotAndSignUpText}>No Account then Signup</Text>
            </TouchableOpacity>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#BBB',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontWeight: "bold",
        fontSize: 50,
        color: "#fb5b5a",
        marginBottom: 40,
    },
    inputView: {
        width: "80%",
        backgroundColor: "#888",
        borderRadius: 25,
        height: 50,
        marginBottom: 20,
        justifyContent: "center",
        padding: 20
    },
    inputText: {
        height: 50,
        color: "white"
    },
    forgotAndSignUpText: {
        color: "white",
        fontSize: 15
    },
    loginBtn: {
        width: "80%",
        backgroundColor: "#fb5b5a",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 40,
        marginBottom: 10
    },
});
export default Driverlogin;


