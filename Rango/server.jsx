import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import Mapbox from '@rnmapbox/maps';
import Geolocation from '@react-native-community/geolocation';
import axios from 'axios';
import { MAPBOX_API_KEY } from '../config';
import { useSharedParams } from '../ParamContext';


Mapbox.setAccessToken(MAPBOX_API_KEY);


const DriverMap = () => {

  const { sharedParams } = useSharedParams();
  const Currentuser = sharedParams.CurrentUser;
  const Rangorideid = sharedParams.RangoRideId;


  const [coords, setcoords] = useState([]);
  const [destinationCoords, setdestinationCoords] = useState([]);
 {/* const [distance, setdistance] = useState(null);
    const [time, settime] = useState(null); */}
  const [routeDirection, setrouteDirection] = useState(null); 

  setdestinationCoords([76.6394, 12.2958]);

  async function getPermissionLocation() {
    try {
      const geo = await Geolocation.getCurrentPosition(
        location => setcoords([location.coords.longitude, location.coords.latitude]),
        err => console.log(err),
        { enableHighAccuracy: true },
      );
    } catch (err) {
      console.error('error getting location', error);
    }
  }

  useEffect(() => {
    getPermissionLocation();
    console.log(coords);
  },coords);

  function makeRouterFeature(long,lat) {
    let routerFeature = {
      type: 'FeatureCollection',
      features: [
        {
          type: 'Feature',
          properties: {},
          geometry: {
            type: 'LineString',
            coordinates: `${[long,lat]}`,
          },
        },
      ],
    };
    return routerFeature;
  }

  async function createRouterLine(coords1,coords2) {
    const startCoords = `${[coords1,coords2]}`;
    const endCoords = `${[destinationCoords[0],destinationCoords[1]]}`;
    const geometries = 'geojson';
    const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${startCoords};${endCoords}?alternatives=true&geometries=${geometries}&access_token=${MAPBOX_API_KEY}`;

    try {
      let response = await axios.get(url);
      let json = await response.data;
      console.log(json);
      const data = json.routes.map((data) => {
        console.log(data);
      });
let coordinates = json.routes[0].geometry.coordinates;
     if (coordinates.length) {
        const routerFeature = makeRouterFeature(coordinates); 
        setrouteDirection(routerFeature)
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <View style={styles.container}>
      <MapboxGL.MapView>
        style={styles.map}
        zoomEnabled={true}
        styleURL = 'mapbox://styles/mapbox/navigation-day-v1'
        rotateEnabled={true}
        onDidFinishLoadingMap={async () => {
          await createRouterLine([...coords]);
        }}
        <MapboxGL.Camera
          zoomLevel={7}
          centerCoordinate={[12.9716, 77.5946]}
          pitch={60}
          animationMode={'flyTo'}
          animationDuration={2000}
        />
       {routeDirection && (
          <MapboxGL.ShapeSource
            id='line1'
            shape={routeDirection}
          >
            <MapboxGL.LineLayer
              id='routerLine01'
              style={{
                lineColor: '#fa9314',
                lineWidth: 4
              }}
            />
          </MapboxGL.ShapeSource>
       )}
           <MapboxGL.UserLocation 
        animated={true}
        androidRenderMode='gps'
        showsUserHeadingIndicator={true}
        />
      
      </MapboxGL.MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }, 
  map:{
    flex:1,
    }
});


export default DriverMap;