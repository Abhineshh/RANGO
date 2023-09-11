import React,{useState,useEffect} from 'react';
import { View, Button, Text, ScrollView, StyleSheet } from 'react-native';
import { AvailRideRoute} from '../APIroutes';
import { ChoosenDriverRoute } from '../APIroutes';
import axios from 'axios';
import { MAPBOX_API_KEY } from '../config';

const AvailRide = function ({ navigation }) {
    const [gotRider,setGotRider] = useState([]);
   
    useEffect(() => {
        getRide();
    },[]);

    async function  geocoding(thecoord1,thecoord2){
       console.log(thecoord1,'     ',thecoord2)
        const names = await axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/${thecoord1},${thecoord2}.json?access_token=${MAPBOX_API_KEY}`)
        const placename = names.data.features;
        const ding = placename.map((name)=>{
            if(name['center'][0] == thecoord1 && name['center'][1] == thecoord2){
                return name['place_name']
            }
            else{
                return 'bling';
            }
        });
        let actualname;
        for(const value of ding){
            if(value != 'bling'){
                actualname = value;
                break;
            }    
        }            
        
        

       
        console.log('the name',actualname)
       return actualname;
    }

    const getRide =async () => {
        try {

            const response = await axios.get(AvailRideRoute);
            console.log(response.data)
            if (response.data.status === true) {
                const theARides =  (response.data.Available).map((zing)=>{
                    const rideId = zing['rangoId'];
                    const dest = zing['destinationLocation'];
                    const Dest =  geocoding(...(zing['destinationLocation']))
                    const pick = zing['pickupLocation'];
                    const Pick=  geocoding(...(zing['pickupLocation']));
                    return {rideId,Dest,Pick};
                })
            setGotRider(theARides);
            console.log(gotRider)
            }
        } catch (error){
            console.error(error);
        }
    }

    function navigating(rid){
        setRide(rid);
        navigation.navigate('DriverHome');
    }

    const setRide = async (raid) =>{
         try {
            const response = await axios.put(ChoosenDriverRoute,{
                raid,
                driveremail:'havells',
            });
            if (response.data.status === true) {
                setGotRider(response.data);
            }
        } catch {
            console.error(error);
        }
    }

    return (

        <ScrollView style={styles.container}>
            {
                gotRider.map((AvailableRides, index) => {
                    return (
                        <View style={styles.card} key={index} onPress={() => { 'DriverHome' }}>
                            <Text>Pickup = {AvailableRides.pick} </Text>
                            <Text>Destination = {AvailableRides.dest}</Text>
                            <Button title={"i am ready for this ride"} onPress={() => { navigating(AvailableRides.rideId) }} />
                        </View>
                    )
                })
            }


        </ScrollView>

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