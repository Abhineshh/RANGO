import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator ,Alert} from 'react-native';
import axios from 'axios';
import { RiderDetailsRoute,PassengerCancel } from '../APIroutes';
import { MAPBOX_API_KEY } from '../config';
import { useSharedParams } from '../ParamContext';

const PassengerDetails = function ({ route , navigation}) {

    const { sharedParams } = useSharedParams();

    const Currentuser = sharedParams.CurrentUser;
    const Rangorideid = sharedParams.RangoRideId;

    const [pcoords, setpcoords] = useState('');
    const [dcoords, setdcoords] = useState('');
    const [distance, setdistance] = useState('');
    const [otp, setotp] = useState('');
    const [driveremail, setdriveremail] = useState('');
    const [gotten, changegotten] = useState(false);

    useEffect(() => {
        getData();

    },[]);

    async function geocoding(thecoord1, thecoord2) {
        console.log('the getCoords', thecoord1, thecoord2);
        console.log(thecoord1[0], "   ", thecoord1[1], "    ", thecoord2[0], "    ", thecoord2[1]);
        const responsedata = await axios.get(`https://api.mapbox.com/directions-matrix/v1/mapbox/driving/${thecoord1[0]},${thecoord1[1]};${thecoord2[0]},${thecoord2[1]}?access_token=${MAPBOX_API_KEY}`);
        console.log("sing ring bing", responsedata.data, 'i am ultra legend');
        {/*
      const response = await axios.get(`https://api.mapbox.com/directions-matrix/v1/mapbox/driving/-122.42,37.78;-122.45,37.91;-122.48,37.73?approaches=curb;curb;curb&access_token=${MAPBOX_API_KEY}`);
      
      console.log(response,"\n ding indg \n");
    */}
        console.log(responsedata.data.destinations)
        const dis = (responsedata.data.destinations).map((zing) => {
            console.log(zing.distance);
            if (zing.distance > 0) {
                return zing.distance;
            }
        })
        let actualdistance =0;
        dis.forEach(element => {
            console.log('ditanceeee',element)
            actualdistance += Math.round(element);
        });

        return actualdistance;
    }


    async function getData() {
        try {
            const a = Rangorideid;
            console.log(a)
            const response = await axios.get(RiderDetailsRoute, {
                params: {
                    rideid: a,
                }
            });
            const result = response.data;
            console.log('ddd', result.status);
            if (result.status === true) {
               
                const dest = result.datas.destinationName;
                console.log('name of the place', dest)
                setdcoords(dest);
                const pick =result.datas.pickupName;
                console.log(pick)
                setpcoords(pick);
                setotp(result.datas.sotp);
                setdriveremail(result.datas.driverEmail);

                const distence = await geocoding(result.datas["pickupLocation"], result.datas["destinationLocation"]);
                console.log('distaaance', distence);
                setdistance(distence);

                console.log(dcoords, pcoords, otp, driveremail, gotten)
                changegotten(true);
                return true;
            }
        } catch (err) {
            console.log('Getting the Ride has a Error', err);
        }
    }


    async function CancelRide(){
        try{
            const response = await axios.post(PassengerCancel,{
                Rangorideid,
            });

            console.log(response.data);
            if(response.data.status == true){
                navigation.navigate('PassengerReview');
            }
            if(response.data.status == false){
                console.log('Cancellation Unsuccessfull');
                 Alert.alert(`couldn't Cancel the Ride`, 'Try Again Later');
            }
        }catch(err){
            console.log('Cancelling the ride has given a error',err)
        }
    }

    return (
        <View style={styles.container}>
            {gotten ? (
                <View>
                    <View style={styles.card}>
                        <Text style={styles.texter}>From : {pcoords}</Text>
                        <Text style={styles.texter} >To : {dcoords}</Text>
                    </View>
                    <View style={styles.card}>
                        <Text style={styles.texter}>Start OTP : {otp}</Text>
                       
                        <Text style={styles.texter}>Distance: {distance}</Text>
                    </View>
                    <View style={styles.card}>
                        <Text style={styles.texter}>Driver Email : {driveremail}</Text>
                    </View>
                    <View>
                        <TouchableOpacity
                            style={styles.loginBtn}
                            onPress={()=>{CancelRide()}}
                            >
                            <Text style={styles.loginText}>CANCEL THE RIDE</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            ) : (
                <View style={styles.container}>
                    <Text>
                        loading the details....
                    </Text>
                </View>
            )}
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        height:'100%',
        backgroundColor: '#BBB',
        alignItems: 'center',
        justifyContent: 'flex-start',
        color:'#000',
    },
    card: {
        backgroundColor: '#fff',
        marginTop: 25,
        marginBottom: 25,
        height: 'fitContent',
        width: 'fitContent',
        borderRadius: 10,
        padding: 15,
    },
    pcard: {
        backgroundColor: '#fff',
        height: '15%',
        borderRadius: 10,
        padding: 15,
        width: '90%',
    },
    texter: {
        fontSize: 20,
        padding: 5,
         color:"#000",
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


export default PassengerDetails;