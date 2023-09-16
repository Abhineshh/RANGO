import React, { useState, useEffect ,useContext} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    Alert,
} from 'react-native';
import axios from 'axios';
import { passengersignupRoute } from '../APIroutes';


const Passengersignup = function ({ navigation }) {

    const [User, setUser] = useState({
        name: "",
        email: "",
        password: "",
    });

    const handleValidation= () => {
        const { username, email, password} = User;
        if (username === "") {
            Alert.alert("Email and Password is required.");
            return false;
        } else if (password === "") {
            Alert.alert("Email and Password is required.");
            return false;
        } else if(email === ""){
            Alert.alert("Email and Password is required.");
            return false;
        }
        return true;
    };

    function navigating(){
        navigation.navigate('Passenger',
              {
                screen: 'Chooser',
                params: {
                    CurrentUser: User.email
                }
            
        });
    }

    async function settheUser() {
        console.log(User);
        if (handleValidation()) {
      const dataa = await axios.post(passengersignupRoute, User );
      
        console.log(dataa)
      if (dataa.data.status === false) {
       Alert.alert(`'the emailid or password is alreaddy used`);
      }
      if( dataa.data.status === true) {
        navigating();
      }
    }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>RIDER SIGN-UP</Text>
            <View style={styles.inputView}>
                <TextInput
                    style={styles.inputText}
                    placeholder="name"
                    placeholderTextColor="#003f5c0"
                    onChangeText={text => {
                        User.name = text
                        setUser({ ...User })
                    }} />
            </View>
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
                    placeholderTextColor="#003f5c"
                    onChangeText={text => {
                        User.password = text
                        setUser({ ...User })
                    }} />
            </View>

            <TouchableOpacity
                onPress={(e) => { settheUser() }}
                style={styles.loginBtn}>
                <Text style={styles.loginText}>SIGN-UP</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => { navigation.goBack('Passengerlogin') }}>
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
        backgroundColor: "#00abfb",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 40,
        marginBottom: 10
    },
});
export default Passengersignup;