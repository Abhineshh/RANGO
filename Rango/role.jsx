import React from 'react';
import {View,SafeAreaView,Text,Button,StyleSheet,TouchableOpacity} from 'react-native';

import InitDriver from './driverScreens/initDriver';
import InitPassenger from './passengerScreens/initPassenger';


function Role({navigation}){
  return(
       <View style={styles.container}>
         <Text style={styles.title}>CHOOSE YOUR ROLE</Text>
           <TouchableOpacity
                onPress={() => {navigation.navigate('InitDriver') }}
                style={styles.loginBtn}>
                <Text style={styles.loginText}>I AM A DRIVER </Text>
            </TouchableOpacity>
           <TouchableOpacity
                onPress={() => {navigation.navigate('InitPassenger')}}
                style={styles.loginBtn}>
                <Text style={styles.loginText}>I AM A PASSENGER </Text>
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
     loginBtn: {
        width: "80%",
        backgroundColor: "#fb5b5a",
        borderRadius: 25,
        height: 200,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 40,
        marginBottom: 10
    },
      title: {
        fontWeight: "bold",
        fontSize: 40,
        color: "#fb5b5a",
        marginBottom: 40,
    },
})

export default Role;