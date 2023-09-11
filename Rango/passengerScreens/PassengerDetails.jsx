import React,{useState,useEffect} from 'react';
import {View,Button,Text,StyleSheet,TouchableOpacity} from 'react-native';
import { RiderDetailsRoute } from '../APIroutes';

const PassengerDetails = function({route}){
    const [UserEmail,setUser] = useState('');

    useEffect(()=>{
        setUser(route.params.UserEmail);
        console.log(UserEmail);
        getData();
    }); 

    async function getData(){
        try{
            const response = await axios.get(RiderDetailsRoute,{

            });
        }catch(err){
            console.log(err);
        }
    }

    return(
        <View style={styles.container}>
            <View style={styles.card}>
                <Text style={styles.texter}>From : Pickup loacation goes here{}</Text>
                <Text style={styles.texter} >To : Destination location goes here{}</Text>
                <Text style={styles.texter}>Distance : Distance gose here{}</Text>
            </View>
            <View style={styles.pcard}>
                <Text style={styles.texter}>Price : price goes here</Text>
                <Text style={styles.texter}>Start OTP : goes here</Text>
            </View>
            <View style={styles.card}>
                <Text style={styles.texter}>Driver Name : Driver name goes here</Text>
                <Text style={styles.texter}>Driver phone NUmber : phone number goes here</Text>
                <Text style={styles.texter}>Driver Rating no.</Text>
            </View>
            <View>
                 <TouchableOpacity
                style={styles.loginBtn}>
                <Text style={styles.loginText}>CANCEL THE RIDE</Text>
            </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#BBB',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    card:{
        backgroundColor:'#fff',
        marginTop:25,
        marginBottom:25,
        height:'29%',
        width:'90%',
        borderRadius:10,
        padding:15,
    },
    pcard:{
        backgroundColor:'#fff',
        height:'15%',
        borderRadius:10,
        padding:15,
         width:'90%',
    },
    texter:{
        fontSize:20,
        padding:5,
    },
     loginBtn: {
        width: "100%",
        backgroundColor: "#00abf0",
        borderRadius: 25,
        height: 70,
        alignItems: "center",
        justifyContent: "center",
        padding:15,
    },
});


export default PassengerDetails;