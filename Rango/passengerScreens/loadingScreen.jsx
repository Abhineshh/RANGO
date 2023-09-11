import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import axios from 'axios';
import { getRiderWait } from '../APIroutes';

const LoadingScreen = ({route,navigation}) => {
   
    const [getRider, setGetRider] = useState('');
    
  
    useEffect(() => {
      for(let i=0;i<=5;i++){
       setTimeout(getRide,7000);
      }
      }, []);


    const getRide = async () => {
        try {
              const rid = route.params.RangoRideId;
              console.log(route.params[CurrentUser])
            console.log(rid)
            const response = await axios.get(getRiderWait,{
                params:rid,
            });
            console.log(response.data)
            if (response.data.status === true) {
                setGetRider(response.data.selected);
                navigating();
                console.log(getRider);
            }
           
        } catch {
            console.error(error);
           
        }
    }


    function navigating() {
        navigation.navigate('PassengerHome',{
            screen:'PassengerDetails',
            params:{
                CurrentUser:route.params.CurrentUser,
                RangoRideId:route.params.RangoRideId,
            }
        });
    }



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

