import React, { useState, useContext } from 'react';
import {
    StyleSheet,
    Alert,
    Text,
    View,
    TextInput,
    TouchableOpacity,
} from 'react-native';
import axios from 'axios';
import { passengerloginRoute } from '../APIroutes';

//component
const Passengerlogin = function ({ navigation }) {

    const [User, setUser] = useState({
        email: '',
        password: '',
    });


    const handleValidation = () => {
        const password = User.password;
        const email = User.email;
        const emailRegex = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
        const passwordRegex = /^[A-Za-z0-9._%-]{4,20}/;
        if (password === "" || !passwordRegex.test(password)) {
            Alert.alert("Enter Valid Email and Password");
            return false;
        } else if (email === "" || !emailRegex.test(email)) {
            Alert.alert("Enter Valid Email and Password");
            return false;
        }
        return true;
    };

    function navigating() {
        navigation.navigate('Passenger',
            {
                screen: 'Chooser',
                params: {
                    CurrentUser: User.email
                }
            });
    }



    async function gettheUser() {
        try {
            if (handleValidation()) {
                console.log(User)
                const useeer = await axios.post(passengerloginRoute, User);
                console.log(useeer.data, 'was the response status \n');
                if (useeer.data.status === false) {
                    Alert.alert(`couldn't login`, 'the email or password is wrong');
                }
                if (useeer.data.status === true) {

                    navigating();
                }
            }
        } catch (e) {
            console.log(e)
        }
    }


    return (
        <View style={styles.container}>
            <Text style={styles.title} >RIDER LOG-IN</Text>
            <View style={styles.inputView}>
                <TextInput
                    style={styles.inputText}
                    placeholder="Email"
                    placeholderTextColor="#003f5c"
                    onChangeText={text => {
                        User.email = text
                        setUser({ ...User })
                    }} />
            </View>
            <View style={styles.inputView}>
                <TextInput
                    style={styles.inputText}
                    secureTextEntry
                    placeholder="Password"
                    onChangeText={text => {
                        User.password = text
                        setUser({ ...User })
                    }} />
            </View>

            <TouchableOpacity
                onPress={() => { gettheUser() }}
                style={styles.loginBtn}>
                <Text style={styles.loginText}>LOGIN </Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => { navigation.navigate('Passengersignup') }}>
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
export default Passengerlogin;


