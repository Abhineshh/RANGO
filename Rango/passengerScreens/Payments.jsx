import React,{useEffect} from 'react';
import {View,Text,StyleSheet, TouchableOpacity} from 'react-native';
const Payment = function({navigation}){

    

    return(
        <View style={styles.container}>
            <Text style={styles.title}>Ride has Ended</Text>
            <TouchableOpacity
                onPress={()=>{
                   navigation.navigate('Passenger')
                }}
                style={styles.loginBtn}>
                <Text style={styles.loginText}>END THE RIDE</Text>
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

export default Payment;