import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { MAPBOX_API_KEY } from '../config';
import axios from 'axios';
import { ChooserRoute } from '../APIroutes';



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
    const [pickup, setpickup] = useState({
        Pname: '',
        lat: '',
        long: '',
    });
    const [Destination, setDestination] = useState({
        lat: '',
        long: '',
    });

    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const handleSearch = async () => {
        const results = await searchPlaces(searchQuery);
        setSearchResults(results);
    };

    let searchData = new Array( searchResults);


    return (
        <View style={styles.container}>
            <Text style={styles.title}>Choose PickUp and Destination</Text>
            <View>
                <TextInput
                    placeholder="Search for places"
                    value={searchQuery}
                    onChangeText={(text) => setSearchQuery(text)}
                    onBlur={handleSearch}
                />
                <FlatList
                    data={searchResults}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <Text>{item.place_name}</Text>
                    )}
                />
            </View>
            {
                searchData.forEach((searchData, index) => {
                    return (
                        <View style={styles.card} key={index} onPress={() => { 'PassengerHome' }}>
                            <Text>{searchData} </Text>
                            <Text>{index}</Text>
                            <Button title={"i am ready for this ride"} onPress={() => { navigation.navigate('DriverHome') }} />
                        </View>
                    )
                })
            }


            <TouchableOpacity
                onPress={() => { navigation.navigate('ChooserMap') }}
                style={styles.loginBtn}>
                <Text style={styles.loginText}>Choose on Map </Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => { navigation.navigate('PassengerHome') }}
                style={styles.loginBtn}>
                <Text style={styles.loginText}>Let's Ride</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#BBB',
        alignItems: 'center',

    },
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
        width: "80%",
        backgroundColor: "#888",
        borderRadius: 25,
        height: 50,
        marginBottom: 20,
        justifyContent: "center",
        padding: 20
    },
});


export default Chooser;