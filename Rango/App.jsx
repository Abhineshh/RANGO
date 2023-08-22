import React from 'react';
import {SafeAreaView,ScrollView,StatusBar,StyleSheet,Text,View} from 'react-native';
import MapView, { PROVIDER_GOOGLE,Marker} from 'react-native-maps';

function App(){
 
  return (
    <SafeAreaView>
      <StatusBar />
     <View style={styles.container}>
     <MapView
       provider={PROVIDER_GOOGLE} // remove if not using Google Maps
       style={styles.map}
       initialRegion={{
         latitude: 37.78825,
         longitude: -122.4324,
         latitudeDelta: 0.015,
         longitudeDelta: 0.0121,
       }}
       >
        <Marker coordinate={{
           latitude: 37.78825,
         longitude: -122.4324,
         latitudeDelta: 0.015,
         longitudeDelta: 0.0121,
        }}/>
     </MapView>
   </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
   container: {
   ...StyleSheet.absoluteFillObject,
   height: 760,
   width: 400,
   justifyContent: 'flex-end',
   alignItems: 'center',
 },
 map: {
   ...StyleSheet.absoluteFillObject,
 },
});

export default App;
