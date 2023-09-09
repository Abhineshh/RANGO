import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { MAPBOX_API_KEY } from '../config';
import axios from 'axios';
import { ChooserRoute } from '../APIroutes';
import { CurrentUserContext } from './authContextProvider';



const searchPlaces = async (query) => {
    try {
        const response = await axios.get(
            `https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?access_token=${MAPBOX_API_KEY}`
        );

        if (response.data.features && response.data.features.length > 0) {
            return response.data.features;
        } else {
            return [];
        }
    } catch (error) {
        console.error('Error searching places:', error);
        return [];
    }
};



const Chooser = function ({ navigation }) {
    const { CurrentUser, setUserEmail } = useContext(CurrentUserContext);
    const changeHandler = () => {
        setUserEmail(User.email)
        console.log('the current user is ', CurrentUser);

    };

    const [pickup, setpickup] = useState([]);
    const [Destination, setDestination] = useState([]);

    const [searchQueryPick, setSearchQueryPick] = useState('');
    const [searchQueryDest, setsearchQueryDest] = useState('');
    const [searchResultsPick, setSearchResultsPick] = useState([]);
    const [searchResultsDest, setSearchResultsDest] = useState([]);

    const handleSearchPickup = async () => {
        const results = await searchPlaces(searchQueryPick);

        const thepoint = results.map((ding) => {
            const coord = ding['center']
            const placename = ding['place_name']
            return { coord, placename };
        })
        setSearchResultsPick(thepoint);
        console.log('the pickup list \n', thepoint)


    };
    const handleSearchDest = async () => {
        const results = await searchPlaces(searchQueryDest);
        const thepoint = results.map((ding) => {
            const coord = ding['center']
            const placename = ding['place_name']
            return { coord, placename };
        })
        setSearchResultsDest(thepoint);
        console.log('the destination list \n', thepoint)

    };

     function navigating(){
        navigation.navigate('PassengerHome');
    }

    const RideInitiator = async () => {
        console.log(pickup," ",Destination);
        const ridinator = await axios.post(ChooserRoute,{

            pickup,
            Destination,

        });
        if(ridinator.data.status=== false){
            Alert.alert(`couldn't process the data try again`)
        }
        if(ridinator.data.status === true){
            navigating();
        }
    }

    return (
        <View style={styles.container}>
            <Text>{CurrentUser}</Text>
            <Text style={styles.title}>Choose PickUp and Destination</Text>
            <View style={styles.place}>
                <View style={styles.inputView}>
                    <TextInput
                        placeholder="Search for Pickup Location"
                        value={searchQueryPick}
                        onChangeText={(text) => setSearchQueryPick(text)}
                        onBlur={handleSearchPickup}
                        style={styles.inputText}
                    />
                </View>
                <View>{
                    searchResultsPick.map((searchResultsPick, index) => {
                        return (
                            <TouchableOpacity
                                key={index}
                                onPress={() => {setpickup(searchResultsPick.coord);console.log(searchResultsPick.placename) }}>

                                <Text style={styles.loginText}>{searchResultsPick.placename}</Text>
                            </TouchableOpacity>)
                    })
                }
                </View>
            </View>
            <View style={styles.place}>
                <View style={styles.inputView}>
                    <TextInput
                        placeholder="Search for Destination"
                        value={searchQueryDest}
                        onChangeText={(text) => setsearchQueryDest(text)}
                        onBlur={handleSearchDest}
                        style={styles.inputText}
                    />
                </View>
                <View>
                  {
                    searchResultsDest.map((searchResultsDest, index) => {
                        return (
                            <TouchableOpacity
                                key={index}
                                onPress={() => {setDestination(searchResultsDest.coord);console.log(searchResultsDest.placename) }}>

                                <Text style={styles.loginText}>{searchResultsDest.placename}</Text>
                            </TouchableOpacity>)
                    })
                }
                </View>
            </View>


            <TouchableOpacity
                onPress={() => { RideInitiator()}}
                style={styles.loginBtn}>
                <Text style={styles.loginText}>Let's Ride</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        backgroundColor: '#BBB',
        justifyContent: 'center',

    },
    place: {
        widht: '100%',
        alignItems: 'center',
        height: '30%',
        justifyContent: 'center',
    }
    ,
    inputText: {
        height: 50,
        color: "white"
    },
    title: {
        fontWeight: "bold",
        fontSize: 27,
        color: "#fb5b5a",
        marginBottom: 80,
        marginTop: 40,
    },
    loginBtn: {
        width: "80%",
        backgroundColor: "#fb5b5a",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 40,
        marginBottom: 10
    },
    inputView: {
        width: "100%",
        backgroundColor: "#888",
        borderRadius: 25,
        height: 50,
        marginBottom: 20,
        justifyContent: "center",
        padding: 20,
        fontSize: 26,
    },
});


export default Chooser;