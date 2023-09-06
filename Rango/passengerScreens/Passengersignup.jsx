import React, { useState, useEffect } from 'react';
import {
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View,
    TextInput,
    TouchableOpacity,
} from 'react-native';
import {
    Colors,
    DebugInstructions,
    Header,
    LearnMoreLinks,
    ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import axios from 'axios';
import Passenger from './Passenger';
import { passengersignupRoute } from '../APIroutes';

const Passengersignup = function ({ navigation }) {
    const [User, setUser] = useState({
        name: "",
        email: "",
        password: "",
    });

           async function settheUser(){
            try{
                const useeer = await axios.post(passengersignupRoute,User)
                console.log(useeer.status , 'was the response status \n' );
            }catch(err){console.log(err)}
        }
    


    return (
        <View style={styles.container}>
            <Text style={styles.title}>RIDER SIGN-UP</Text>
             <View style={styles.inputView}>
                <TextInput
                    style={styles.inputText}
                    placeholder="name"
                    placeholderTextColor="#003f5c"
                    onChangeText={text =>{
                        User.name= text
                         setUser({ ...User })}} />
            </View>
            <View style={styles.inputView}>
                <TextInput
                    style={styles.inputText}
                    placeholder="Email"
                    placeholderTextColor="#003f5c"
                    onChangeText={text =>{ 
                        User.email = text
                        setUser({ ...User})}} />
            </View>
            <View style={styles.inputView}>
                <TextInput
                    style={styles.inputText}
                    secureTextEntry
                    placeholder="Password"
                    placeholderTextColor="#003f5c"
                    onChangeText={text =>{
                        User.password = text
                         setUser({ ...User })}} />
            </View>
          
            <TouchableOpacity
                onPress={(e)=>{settheUser()}}
                style={styles.loginBtn}>
                <Text style={styles.loginText}>LOGIN </Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={()=>{navigation.goBack('Passengerlogin')}}>
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
export default Passengersignup;