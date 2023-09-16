import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { RiderDetailsRoute } from '../APIroutes';
import { MAPBOX_API_KEY } from '../config';
import { useSharedParams } from '../ParamContext';

const PassengerDetails = function ({ route }) {

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
        getData()

    }, []);

    async function geocoding(thecoord1, thecoord2) {
        console.log(thecoord1, '  ', thecoord2)
        const names = await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${thecoord1},${thecoord2}.json?access_token=${MAPBOX_API_KEY}`);
        const placename = names.data.features;
        console.log('placename', placename)
        const ding = placename.map((name) => {
            if (name['center'][0] == thecoord1 && name['center'][1] == thecoord2) {
                return name['place_name']
            }
            else {
                return 'nil';
            }
        });
        let actualname;
        for (const value of ding) {
            if (value != 'nil') {
                actualname = value;
                break;
            }
        }
        console.log('the name', actualname)
        return actualname;
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
                const [thecoord1, thecoord2] = result.datas.destinationLocation;
                const dest = await geocoding(...result.datas.destinationLocation);

                console.log('name of the place', dest)

                setdcoords(dest);
                const pick =await geocoding(...result.datas.pickupLocation)

                console.log(pick)
                setpcoords(pick);
                setotp(result.datas.sotp);
                setdriveremail(result.datas.driverEmail);
                console.log(dcoords, pcoords, otp, driveremail, gotten)
                changegotten(true);
                return true;
            }
        } catch (err) {
            console.log('asfdasdfsdf', err);
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
                    <View style={styles.pcard}>
                        <Text style={styles.texter}>End OTP : {otp}</Text>
                    </View>
                    <View style={styles.card}>
                        <Text style={styles.texter}>Driver Email : {driveremail}</Text>

                    </View>
                    <View>
                        <TouchableOpacity
                            style={styles.loginBtn}>
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

        backgroundColor: '#BBB',
        alignItems: 'center',
        justifyContent: 'flex-start',
        color:'#000',
    },
    card: {
        backgroundColor: '#fff',
        marginTop: 25,
        marginBottom: 25,
        height: '29%',
        width: '90%',
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