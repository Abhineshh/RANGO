import React,{useState,useEffect} from 'react';
import { StyleSheet, View } from 'react-native';
import Mapbox,{ PointAnnotation, MarkerView ,Camera } from '@rnmapbox/maps';
import { MAPBOX_API_KEY } from '../config';
import { TrackDriverRoute } from '../APIroutes';
import axios from 'axios';
import { useSharedParams } from '../ParamContext';

Mapbox.setAccessToken(MAPBOX_API_KEY);

const PassengerMap = () => {
const { sharedParams } = useSharedParams();
  const Currentuser = sharedParams.CurrentUser;
  const Rangorideid = sharedParams.RangoRideId;

  const [coords,setcoords] = useState([77.345,12.434]);

  useEffect(()=>{
   

  },[]);

  return (
   <View style={styles.page}>
      <View style={styles.container}>
      <Mapbox.MapView style={styles.map}>
          <Camera zoomLevel={4} centerCoordinate={coords} />
          <PointAnnotation id='the location' coordinate={coords} />

        </Mapbox.MapView> 
      </View>
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
  }
});


export default PassengerMap;