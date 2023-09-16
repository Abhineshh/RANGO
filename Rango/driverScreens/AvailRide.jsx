import React, { useState, useEffect } from 'react';
import { View, Button, Text, ScrollView, StyleSheet } from 'react-native';
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
        console.log(thecoord1, '     ', thecoord2)
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

    const getRide = async () => {
        try {
            console.log('getting the data')
            const response = await axios.get(AvailRideRoute);
            console.log(response.data, ' asdfsdf   ');
            if (response.data.status === true) {
                const theARides = await (response.data.Available).map((zing) => {
                    console.log(zing['rangoId']);
                    const rideId = zing['rangoId'];
                    const dest = zing['destinationLocation'];
                    const Dest = geocoding(...zing['destinationLocation']);
                    const pick = zing['pickupLocation'];
                    const Pick = geocoding(...zing['pickupLocation']);
                    return { rideId, Dest, Pick };
                })
                setGotRider(theARides);
                changegotten(true);
                return true;
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
            console.log(thisride, "\n", thisride.rideId);
            const response = await axios.post(ChoosenDriverRoute, {
                rangoid: thisride.rideId,
                driveremail: route.params.CurrentUser,
            });
            if (response.data.status === true) {

                navigating(thisride.rideId)
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <View>
            {gotten ? (
            <ScrollView style={styles.container}>
                {
                    gotRider.map((AvailableRides, index) => {
                        return (
                            <View style={styles.card} key={index} onPress={() => { 'DriverHome' }}>
                                <Text>Pickup = {AvailableRides.pick} </Text>
                                <Text>Destination = {AvailableRides.dest}</Text>
                                <Button title={"i am ready for this ride"} onPress={() => { setRide(AvailableRides) }} />
                            </View>
                        )
                    })
                }


            </ScrollView>
            ) : (
                <View style={styles.container}>
                    <Text>
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