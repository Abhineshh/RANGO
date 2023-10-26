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
import { driversignupRoute } from '../APIroutes';


const Driversignup = function ({ navigation }) {
    const [Driver, setDriver] = useState({
        name: "",
        email: "",
        password: "",
    });

    const handleValidation = () => {
        const { username, email, password } = Driver;

        const emailRegex = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
        const passwordRegex = /^[A-Za-z0-9._%-]{4,20}/;
        const UserNameRegex = /^[A-Za-z0-9._%-]{4,20}/;

        if (username === "" || !UserNameRegex.test(username)) {
            Alert.alert("Email and Password is required.");
            return false;
        } else if (password === "" || !passwordRegex.test(password)) {
            Alert.alert("Email and Password is required.");
            return false;
        } else if (email === "" || !emailRegex.test(email)) {
            Alert.alert("Email and Password is required.");
            return false;
        }
        return true;
    };

    function navigating() {
        navigation.navigate('Driver', {
            screen: 'AvailRide',
            params: {
                CurrentUser: Driver.email,
            }
        });
    }

    async function settheDriver() {
        if (handleValidation()) {
            const useeer = await axios.post(driversignupRoute, Driver)
            console.log(useeer.data.status, 'was the response status \n');
            if (useeer.data.status === false) {
                Alert.alert('the emailid  is already used','try with some other email id ');
            }
            if (useeer.data.status === true) {
                navigating();
            }
        }
    }



    return (
        <View style={styles.container}>
            <Text style={styles.title}>DRIVER SIGN-UP</Text>
            <View style={styles.inputView}>
                <TextInput
                    style={styles.inputText}
                    placeholder="name"
                    placeholderTextColor="#003f5c"
                    onChangeText={text => {
                        Driver.name = text
                        setDriver({ ...Driver })
                    }} />
            </View>
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
                onPress={() => { settheDriver() }}
                style={styles.loginBtn}>
                <Text style={styles.loginText}>LOGIN </Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => { navigation.goBack('Driverlogin') }}>
                <Text style={styles.forgotAndSignUpText}>Login Instead</Text>
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
        color: "#00abf0",
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
        backgroundColor: "#00abf0",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 40,
        marginBottom: 10
    },
});
export default Driversignup;