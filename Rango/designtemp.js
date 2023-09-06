import React, { useState ,useEffect} from 'react';
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
import Passenger from './Passenger';
import Passengersignup from './Passengersignup';
import {io} from 'socket.io-client';
import axios from 'axios';
import { passengerloginRoute } from '../APIroutes';
const socket = io.connect("http://localhost:5000");

const Passengerlogin = function ({ navigation }) {
    const [User, setUser] = useState({ email: "", password: "", signedIn: false });

   function ding(){
    socket.emit();
   }
    const handleSubmit = async (event) => {
        socket.emit();

        const { email, password } = User;
        {/* Alert.alert("the data",`${email}${password} ${User.signedIn}`,[{text:'ding ding'}]);  */ }
        await axios.post(passengerloginRoute,{
            firstName: 'Fred',
        })
        .then((response)=>{console.log(response)});

/*
        const { datas } = await axios.post(passengerloginRoute, {
            email,
            password,
        });
        if (datas.status === false) {
            Alert.alert(
                "could'nt login",
                "check if the credentials are correct", [{
                    text: 'ok',
                    onPress: () => console.log('ok pressed')
                }]);
        }
        if (datas.status === true) {


            User.signedIn = true;
            User.password = ""
            setUser({ ...User })

            Alert.alert("the data", `${datas.data}${email}${password}  ${User.signedIn}`, [{ text: 'ding ding' }]);

            navigation.navigate('Passenger', {
                screen: "Chooser",
                params: User,
            });
        }
    */
    }
    return (
        <View style={styles.container}>
            <Text style={styles.title}>RIDER LOG-IN</Text>
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
                onPress={() => {ding }}
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
export default Passengerlogin;


