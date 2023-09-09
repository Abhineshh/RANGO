import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Mapbox, { Camera, MarkerView, MapView } from '@rnmapbox/maps';
import { MAPBOX_API_KEY } from '../config';

Mapbox.setAccessToken(MAPBOX_API_KEY);

const ChooserMap = () => {
//when this component loads gethe current location using useEffect and pass it to the map element

  const [markerCoordinates, setMarkerCoordinates] = useState(null);

  const handleMarkerDragEnd = (event) => {
    const { geometry } = event.features[0];
    setselectedLocation(geometry.coordinates)
  }

  return (
    <View style={styles.page}>
      <View style={styles.container}>
         <Mapbox.MapView style={styles.map}
          MarkerView coordinate={[77.5946,12.9716]}
          /> 
      </View>
    </View>
  );
}

export default ChooserMap;

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