import React, { useState, useEffect } from 'react';
import { View, Button, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { DriverCancel, DriverDetailsRoute } from '../APIroutes';
import { MAPBOX_API_KEY } from '../config';
import axios from 'axios';
import { useSharedParams } from '../ParamContext';

const DriverDetails = function ({ route, navigation }) {


    const { sharedParams } = useSharedParams();

    const Currentuser = sharedParams.CurrentUser;
    const Rangorideid = sharedParams.RangoRideId;

    const [pcoords, setpcoords] = useState('');
    const [dcoords, setdcoords] = useState('');
    const [distance, setdistance] = useState('');
    const [otp, setotp] = useState('');
    const [rideremail, setrideremail] = useState('');
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
            console.log('ding ding', Rangorideid);
            const a = Rangorideid;
            const response = await axios.get(DriverDetailsRoute, {
                params: {
                    rideid: a,
                }
            });
            const result = response.data;
            console.log(result);
            if (result.status === true) {

                const dest = result.datas.destinationName;
                setdcoords(dest);
                const pick = result.datas.pickupName;
                setpcoords(pick);
                setotp(result.datas.eotp);
                setrideremail(result.datas.riderEmail);

                const distence = await geocoding(result.datas["pickupLocation"], result.datas["destinationLocation"]);
                console.log('distaaance', distence);
                setdistance(distence);
                console.log(dcoords, pcoords, otp, rideremail, gotten)

                changegotten(true);
                return true;
            }
        } catch (err) {
            console.log('asfdasdfsdf', err);
        }
    }

    async function EndRide() {
        try {
            const response = await axios.post(DriverCancel, {
                Rangorideid,
            })


            if (response.data.status == true) {
                navigation.navigate('DriverReviews');
            }
            if (response.data.status == false) {
                console.log('Cancellation Unsuccessfull');
                Alert.alert(`couldn't End the Ride`, 'The Passenger Has not Ended the Ride');
            }

        } catch (err) {
            console.log('the cancellation error', err);
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
                        <Text style={styles.texter}>Distance: {distance }km</Text>
                        <Text style={styles.texter}>End OTP : {otp}</Text>
                    </View>
                    <View style={styles.card}>
                        <Text style={styles.texter}>Passenger Email : {rideremail}</Text>

                    </View>
                    <View>
                        <TouchableOpacity
                            style={styles.loginBtn}
                            onPress={() => { EndRide() }}
                        >
                            <Text style={styles.loginText}>END THE RIDE</Text>
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
    );
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        backgroundColor: '#BBB',
        alignItems: 'center',
        justifyContent: 'flex-start',
        color: "#000",
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
        color: "#000",
    },
    loginBtn: {
        width: "100%",
        backgroundColor: "#fb5b5a",
        borderRadius: 25,
        height: 70,
        alignItems: "center",
        justifyContent: "center",
        padding: 15,
    },
});


export default DriverDetails;