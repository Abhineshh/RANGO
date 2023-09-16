import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet,Alert } from 'react-native';
import axios from 'axios';
import { StartRideOTP } from '../APIroutes';
import { useSharedParams } from '../ParamContext';


const Sotp = function ({route,navigation}) {

    const { sharedParams } = useSharedParams();
  const Currentuser = sharedParams.CurrentUser;
  const Rangorideid = sharedParams.RangoRideId;



    const [otp, setotp] = useState(Number);


    async function StartRide() {
        try {
            console.log('ding ding')
            const response = await axios.post(StartRideOTP,{
                rangoid:Rangorideid,
                stotp:otp,
            })
            if(response.data.status=== true){
                navigation.navigate('DriverMap');
            }
            if(response.data.status === false){
                Alert.alert('Wrong otp',"retry with correct otp")
            }

        } catch (er) {
            console.error(er)
        }
    }



    return (
        <View style={styles.container}>
            <Text style={styles.title}>Enter Your End OTP</Text>
            <View style={styles.inputView}>
                <TextInput
                    style={styles.inputText}
                    placeholder="Enter the EOTP"
                    placeholderTextColor="#003f5c"
                    onChangeText={text => {
                        setotp(text)
                    }}
                />
            </View>
            <TouchableOpacity
                onPress={() => {
                    StartRide()
                }}
                style={styles.loginBtn}>
                <Text style={styles.loginText}>START THE RIDE</Text>
            </TouchableOpacity>
        </View>);
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#BBB',
        alignItems: 'center',
    },
    title: {
        fontWeight: "bold",
        fontSize: 25,
        color: "#fb5b5a",
        marginBottom: 40,
        marginTop: 40,
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
        height: 60,
        color: "white"
    },
    loginBtn: {
        width: "80%",
        backgroundColor: "#fb5b5a",
        borderRadius: 25,
        height: 70,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 40,
        marginBottom: 10
    },
});
export default Sotp;