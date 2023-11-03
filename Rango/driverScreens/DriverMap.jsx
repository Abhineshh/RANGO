import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { DriverDetailsRoute } from '../APIroutes';
import Mapbox, { MapView, PointAnnotation, Camera, } from '@rnmapbox/maps';
import { MAPBOX_API_KEY } from '../config';
import axios from 'axios';
import { useSharedParams } from '../ParamContext';
import Geolocation from '@react-native-community/geolocation';
import { showLocation } from 'react-native-map-link';

Mapbox.setAccessToken(MAPBOX_API_KEY);

const DriverMap = () => {
  const { sharedParams } = useSharedParams();
  const Currentuser = sharedParams.CurrentUser;
  const Rangorideid = sharedParams.RangoRideId;

  // page specific states
  const [pcoords, setpcoords] = useState([]);
  const [dcoords, setdcoords] = useState([]);
  const [coords, setcoords] = useState([]);


  useEffect(() => {

    UserEffecter();
    console.log(pcoords,dcoords)
  }, []);


  function UserEffecter() {
      let i = getData();
      if(i){
      getPermissionLocation();
      }
      
    }
   


  async function getPermissionLocation() {
    try {
      const geo = Geolocation.getCurrentPosition(
        location => setcoords([location.coords.longitude, location.coords.latitude]),
        err => console.log(err),
        { enableHighAccuracy: true },
      );
      console.log('geo coords of the driver', coords)
      return true;
    } catch (err) {
      console.error('error getting location', err);
    }
  }

  function DirectionsTransfer() {

    showLocation({
      latitude: pcoords[1],
      longitude: pcoords[0],
      sourceLatitude: dcoords[1], // optionally specify starting location for directions
      sourceLongitude: dcoords[0], // not optional if sourceLatitude is specified

    });
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
      console.log(result.datas);
      console.log(result.datas.destinationLocation);
      console.log(result.datas.pickupLocation);
      if (result.status === true) {
        setdcoords([result.datas.destinationLocation[0], result.datas.destinationLocation[1]])
        setpcoords([result.datas.pickupLocation[0], result.datas.pickupLocation[1]]);

        console.log('the coordinates retrieved from server', dcoords, 'er', pcoords)

        return true;
      }
    } catch (err) {
      console.log('asfdasdfsdf', err);
    }
  }


  return (
    <View style={styles.page}>
      <View style={styles.container}>
        <MapView style={styles.map}>
          <Camera zoomLevel={4} centerCoordinate={coords} />
          <PointAnnotation id='the location' coordinate={coords} />
          <PointAnnotation id='the pick location' coordinate={pcoords} />
          <PointAnnotation id='the dest location' coordinate={dcoords} />
        </MapView>
      </View>

      <TouchableOpacity
        onPress={() => { DirectionsTransfer() }}
        style={styles.loginBtn}>
        <Text style={styles.loginText}>Navigate </Text>
      </TouchableOpacity>
    </View>
  );
}



const styles = StyleSheet.create({
  page: {
    flex: 1,
    alignItems: 'center',
  },
  container: {
    height: '90%',
    width: '90%',
  },
  map: {
    flex: 1
  },
  loginBtn: {
    width: "80%",
    backgroundColor: "#00abf0",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    marginBottom: 10
  },
});


export default DriverMap;