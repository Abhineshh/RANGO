import React, { useState, useEffect } from 'react';
import { View, Button, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { DriverDetailsRoute } from '../APIroutes';
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
       
    }, []);

    async function geocoding(thecoord1, thecoord2) {
        console.log(thecoord1, '     ', thecoord2)
        console.log(typeof (thecoord1))
        const names = await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${thecoord1},${thecoord2}.json?access_token=${MAPBOX_API_KEY}`)
        const placename = names.data.features;
        const ding = placename.map((name) => {
            if (name['center'][0] == thecoord1 && name['center'][1] == thecoord2) {
                return name['place_name']
            }
            else {
                return 'bling';
            }
        });
        let actualname;
        for (const value of ding) {
            if (value != 'bling') {
                actualname = value;
                break;
            }
        }
        console.log('the name', actualname)
        return actualname;
    }

    async function getData() {
        try {
            console.log('ding ding', Rangorideid);
            const a = Rangorideid;
            console.log(a)
            const response = await axios.get(DriverDetailsRoute, {
                params: {
                    rideid: a,
                }
            });
            const result = response.data;
            console.log(result.status);
            if (result.status === true) {
                const dest = await geocoding(...result.datas.destinationLocation)
                console.log(dest)
                setdcoords(dest);
                const pick = await geocoding(...result.datas.pickupLocation)
                console.log(pick)
                setpcoords(pick);
                setotp(result.datas.eotp);
                setrideremail(result.datas.riderEmail);
                console.log(dcoords, pcoords, otp, rideremail, gotten)
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
                        <Text style={styles.texter}>Driver Email : {rideremail}</Text>

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
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#BBB',
        alignItems: 'center',
        justifyContent: 'flex-start',
        color: "#000",
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