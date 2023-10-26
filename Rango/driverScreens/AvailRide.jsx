import React, { useState, useEffect } from 'react';
import { View, Button, Text, ScrollView, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { AvailRideRoute } from '../APIroutes';
import { ChoosenDriverRoute } from '../APIroutes';
import axios from 'axios';
import { MAPBOX_API_KEY } from '../config';
import { useSharedParams } from '../ParamContext';

const AvailRide = function ({ route, navigation }) {

    const { setSharedParams } = useSharedParams();

    const [gotRider, setGotRider] = useState([]);
    const [gotten, changegotten] = useState(false);

    useEffect(() => {
        getRide();
    }, []);

    async function geocoding(thecoord1, thecoord2) {
        console.log(thecoord1, '  czxczxc   ', thecoord2)
        const names = await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${thecoord1},${thecoord2}.json?access_token=${MAPBOX_API_KEY}`)
        const placename = names.data.features;
        const ding = await placename.map((name) => {
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
            }
        }

        console.log('the name', actualname)
        return actualname;
    }





    const getRide = async () => {
        try {
            console.log('getting the data')
            const response = await axios.get(AvailRideRoute);
            console.log(response.data, ' asdfsdf   ');
            if (response.data.status === true) {

                const theARides = await (response.data.Available).map((zing) => {
                    console.log(zing['rangoId']);
                    const rideId = zing['rangoId'];

                    const Dest = zing['destinationName']

                    const Pick = zing['pickupName']

                    console.log('The data after waiting ::::', Dest, ",,", Pick);
                    return { rideId, Dest, Pick };
                })
                console.log(theARides);
            
                console.log('the array is here \n', theARides);
                setGotRider(theARides);
                console.log('the ride details with somethnink \n', gotRider);
                changegotten(true);
            
              
            }

        } catch (error) {
            console.error(error);
        }
    }

    function navigating(rid) {
        console.log('ging', rid)
        setSharedParams({
            CurrentUser: route.params.CurrentUser,
            RangoRideId: rid,
        });

        navigation.navigate('DriverHome',
            {
                screen: 'DriverDetails',
            });
    }

    const setRide = async (thisride) => {
        try {
            console.log('hihihih', thisride, "\n", thisride.rideId);
            const response = await axios.post(ChoosenDriverRoute, {
                rangoid: thisride.rideId,
                driveremail: route.params.CurrentUser,
            });
            if (response.data.status === true) {

                navigating(thisride.rideId)
            }
        } catch (error) {
            console.error('the erro igh', error);
        }
    }

    function logoutfunction() {
        setSharedParams({
            CurrentUser: '',
            RangoRideId: '',
        });
        navigation.popToTop();
    }
    return (
        <View style={styles.otter}>
            <View>
                <TouchableOpacity
                    style={styles.logoutbutton}
                    onPress={() => {
                        logoutfunction();
                    }}
                >
                    <Text style={styles.inputText}>LOGOUT</Text>
                </TouchableOpacity>
            </View>
            {gotten ? (
                <ScrollView style={styles.container}>
                    {
                        gotRider.map((AvailableRides, index) => {
                            return (
                                <View style={styles.card} key={index} onPress={() => { 'DriverHome' }}>
                                    <Text>Pickup = {AvailableRides["Pick"]} </Text>
                                    <Text>Destination = {AvailableRides["Dest"]}</Text>
                                    <Button title={"i am ready for this ride"} onPress={() => { setRide(AvailableRides) }} />
                                </View>
                            )
                        })
                    }


                </ScrollView>
            ) : (
                <View style={styles.container}>
                    <Text style={{ color: 'white' }}>
                        loading the details
                    </Text>
                </View>
            )}
        </View>

    );
}



const styles = StyleSheet.create({
    container: {
        backgroundColor: '#BBB',
    },
    logoutbutton: {
        width: "25%",
        backgroundColor: "#00abf0",
        borderRadius: 6,
        height: 30,
        padding: 4,
        alignItems: "center",
        marginTop: 10,
        marginBottom: 0,
        marginLeft: '72%',
    },
    otter: {
        height: '100%',
        backgroundColor: '#BBB',
    },
    inputText: {
        height: 60,
        color: "white"
    },
    card: {
        backgroundColor: '#fff',
        marginTop: 25,
        marginBottom: 25,
        height: 100,
        width: '100%',
        borderRadius: 10,
        padding: 15,
    },
});
export default AvailRide;