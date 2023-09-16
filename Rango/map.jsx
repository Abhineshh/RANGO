import React from 'react';
import {View,Text,StyleSheet} from 'react-native';
import Mapbox,{ PointAnnotation, MarkerView ,Camera } from '@rnmapbox/maps';
import { MAPBOX_API_KEY } from './config';

Mapbox.setAccessToken(MAPBOX_API_KEY);


function Map(){
  return(
    <View style={styles.page}>
      <View style={styles.container}>
      <Mapbox.MapView style={styles.map}>
          <Camera zoomLevel={4} centerCoordinate={[77.34,12.78]} />
          <PointAnnotation id='the location' coordinate={[77.34,12.78]} />

        </Mapbox.MapView> 
      </View>
    </View>
  )
}




const styles = StyleSheet.create({
  page: {
    flex: 1,
    alignItems: 'center',
    justifyContent:'center',
  },
  container: {
    height: '90%',
    width: '90%',
  },
  map: {
    flex: 1
  }
});


export default Map;