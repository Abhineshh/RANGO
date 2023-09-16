import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import axios from 'axios';
import { getRiderWait } from '../APIroutes';
import { useSharedParams } from '../ParamContext';

const LoadingScreen = ({ route, navigation }) => {

    const { setSharedParams } = useSharedParams();

    useEffect(() => {
        const getRide = async () => {
            try {
                console.log(route.params.RangoRideId)
                const a = route.params.RangoRideId;
                const response = await axios.get(getRiderWait,{
                  params:{  rideid:a,}
                });
                const result = response.data;
                console.log(result)
                if (result.status === true) {
                    clearInterval(interval);
                    setSharedParams({
                            CurrentUser: route.params.CurrentUser,
                            RangoRideId: route.params.RangoRideId,
                        });
                    navigation.navigate('PassengerHome', {
                        screen: 'PassengerDetails',
                    });
                }
            }catch(error){
                console.error('Error fetching data',error)
            }

    };

    const interval = setInterval(getRide,5000);

    return () => clearInterval(interval);
    },[]);


    return (
        <View style={styles.container}>
            <Text>Waiting for a Driver</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#BBB',
    },
});

export default LoadingScreen;

