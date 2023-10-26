import React, { useState, useContext,useEffect } from 'react';
import { View, Text, TextInput, Alert, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { MAPBOX_API_KEY } from '../config';
import axios from 'axios';
import { ChooserRoute } from '../APIroutes';
import { useSharedParams } from '../ParamContext';



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



const Chooser = function ({ route,navigation }) {
   
    const { setSharedParams } = useSharedParams();

    const [pickup, setpickup] = useState([]);
    const [Destination, setDestination] = useState([]);

    const [pickName,setpickName] = useState('');
    const [destName,setdestName] = useState('');
  
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

    function rideidgen(){
        let d = Date.now();
        return d;
    }

     function navigating(rideid){
        console.log('navi ridedid',rideid,"  ding  ",route.params.CurrentUser);
        const ridew = rideid;
        const cc = route.params.CurrentUser;
         console.log('navi ridedid',rideid,"  ding  ",cc);
        navigation.navigate('LoadingScreen',{
            
                 CurrentUser: route.params.CurrentUser,
                RangoRideId:ridew,
                
        });
    }

    const RideInitiator = async () => {
        console.log(pickup," ",Destination);
        const rideid = rideidgen();
        console.log('the ride generted now',rideid)
        const ridinator = await axios.post(ChooserRoute,{

            pickup,
            Destination,
            riderEmail:route.params.CurrentUser,
            rideid,
            pickName,
            destName,

        });
        console.log(ridinator.data);
        if(ridinator.data.status=== false){
            Alert.alert(`couldn't process the data try again`,'choose pickup and destination')
        }
        if(ridinator.data.status === true){
            navigating(rideid);
        }
    }

    function logoutfunction(){
         setSharedParams({
            CurrentUser: '',
            RangoRideId: '',
        });
         navigation.popToTop();
    }

    return (
        <View style={styles.container}>
            <View>
                <TouchableOpacity
                            style={styles.logoutbutton}
                            onPress={()=>{
                                logoutfunction();
                            }}
                            >
                            <Text style={styles.inputText}>LOGOUT</Text>
                 </TouchableOpacity>
            </View>
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
                                onPress={() => {setpickup(searchResultsPick.coord);
                                console.log(searchResultsPick.placename);
                                setpickName(searchResultsPick.placename);
                                 }}>

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
                                onPress={() => {setDestination(searchResultsDest.coord);
                                console.log(searchResultsDest.placename) 
                                setdestName(searchResultsDest.placename);
                                }}>

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
       logoutbutton:{
               width: "25%",
        backgroundColor: "#00abf0",
        borderRadius: 6,
        height: 30,
        padding:4,
        alignItems: "center",
        marginTop: 10,
        marginBottom: 0,
        marginLeft:'72%',
    },
    container: {
        alignItems: 'center',
        backgroundColor: '#BBB',
        justifyContent: 'center',
        height:'100%',
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
        marginBottom: 20,
        marginTop: 20,
    },
    loginBtn: {
        width: "80%",
        backgroundColor: "#00abf0",
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