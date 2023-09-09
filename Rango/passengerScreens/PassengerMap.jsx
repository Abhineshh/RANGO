import React from 'react';
import { StyleSheet, View } from 'react-native';
import Mapbox from '@rnmapbox/maps';
import { MAPBOX_API_KEY } from '../config';

Mapbox.setAccessToken(MAPBOX_API_KEY);

const PassengerMap = () => {
  return (
    <View style={styles.page}>
      <View style={styles.container}>
        <Mapbox.MapView style={styles.map} />
      </View>
    </View>
  );
}

export default PassengerMap;

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