import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Mapbox, { PointAnnotation, MarkerView, Camera } from '@rnmapbox/maps';
import { MAPBOX_API_KEY } from '../config';
import { RiderDetailsRoute } from '../APIroutes';
import axios from 'axios';
import { useSharedParams } from '../ParamContext';


Mapbox.setAccessToken(MAPBOX_API_KEY);

const PassengerMap = () => {
  const { sharedParams } = useSharedParams();
  const Currentuser = sharedParams.CurrentUser;
  const Rangorideid = sharedParams.RangoRideId;

  const [coords, setcoords] = useState([77.645, 13.434]);

  useEffect(() => {
    async function getData() {
      try {
        console.log('ding ding', Rangorideid);
        const a = Rangorideid;
        console.log(a)
        const response = await axios.get(RiderDetailsRoute, {
          params: {
            rideid: a,
          }
        });
        const result = response.data;
        console.log(result);
        if (result.status === true) {
          const currentLocation = result.datas.driverCurrentLocation;
          console.log(currentLocation);
          setcoords(currentLocation);
        }
      } catch (err) {
        console.log('Error With Getting The Driver Live location', err);
      }
    };
    const interval = setInterval(getData,5000);

    return () => clearInterval(interval);

  }, []);




  return (
    <View style={styles.page}>
      <View style={styles.container}>
        <Mapbox.MapView style={styles.map}>
          <Camera zoomLevel={4} centerCoordinate={coords} />
          <PointAnnotation id='the location' coordinate={coords}/>

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