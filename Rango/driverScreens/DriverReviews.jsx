import React, { useEffect, useState } from 'react';
import {View,Button,Text, StyleSheet,TouchableOpacity,Alert} from 'react-native';
import axios from 'axios';
import {useSharedParams} from '../ParamContext';
import { DriverReviewRoute } from '../APIroutes';

    const DriverRideDetails = function({navigation}){

    const { sharedParams ,setSharedParams} = useSharedParams();
    const Currentuser = sharedParams.CurrentUser;
    const Rangorideid = sharedParams.RangoRideId;

    const [Rating,setRating] = useState('');

    useEffect(()=>{
        GetTheRating();
    },[]);

    async function GetTheRating(){
        try{
            const response = await axios.get(DriverReviewRoute,{
                params: {
                    Rangorideid,
                }
            });
            if(response.data.status == true){
                   setRating(response.data.Reviewdata.Rating);
            }
            if(response.data.status == false){
                Alert.alert('No Reviews','The User Has Not Give any Reviews')
            }
            console.log(response.data)


        }catch(err){
            console.log(err)
        }
    }

    function navigator(){
        navigation.reset({
            index:0,
            routes:[{name:'AvailRide'}]
        });
    }

     function logoutfunction(){
         setSharedParams({
            CurrentUser: '',
            RangoRideId: '',
        });
         navigation.reset({
            index:0,
            routes:[{name:'Driverlogin'}]
        });
    }
    return(
        <View style={styles.container}>
             <View>
                <TouchableOpacity
                            style={styles.logoutbutton}
                            onPress={()=>{
                                logoutfunction();
                            }}
                            >
                            <Text style={styles.inputText}>LOGOUT</Text>
                 </TouchableOpacity>
            </View>
           <Text>Your Passengers Has Given you {Rating} Rating For you Service</Text>
           <TouchableOpacity
                style={styles.loginBtn}
                onPress={()=>{
                    navigator();
                }}
                >
                <Text style={styles.loginText}>DONE</Text>
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
        width: "100%",
        backgroundColor: "#00abf0",
        borderRadius: 25,
        height: 70,
        alignItems: "center",
        justifyContent: "center",
        padding: 15,
    },
});

export default DriverRideDetails;