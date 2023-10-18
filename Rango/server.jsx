import React, { useState, useEffect } from 'react';
import { StyleSheet, View,Text } from 'react-native';
import { DriverDetailsRoute } from '../APIroutes';
import Mapbox, { MapView, PointAnnotation, MarkerView, Camera, ShapeSource, LineLayer, UserLocation } from '@rnmapbox/maps';
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
  const [pcoords, setpcoords] = useState([77.668989,12.996619]);
  const [dcoords, setdcoords] = useState(null);
  const [routeDirection, setrouteDirection] = useState(null);
  const [coords, setcoords] = useState([]);


  useEffect(() => {
    getPermissionLocation();
    showLocation({
  latitude: 38.8976763,
  longitude: -77.0387185,
  sourceLatitude: -8.0870631, // optionally specify starting location for directions
  sourceLongitude: -34.8941619, // not optional if sourceLatitude is specified
  title: 'The White House', // optional
  googleForceLatLon: false, // optionally force GoogleMaps to use the latlon for the query instead of the title
  googlePlaceId: 'ChIJGVtI4by3t4kRr51d_Qm_x58', // optionally specify the google-place-id
  alwaysIncludeGoogle: true, // optional, true will always add Google Maps to iOS and open in Safari, even if app is not installed (default: false)
  dialogTitle: 'This is the dialog Title', // optional (default: 'Open in Maps')
  dialogMessage: 'This is the amazing dialog Message', // optional (default: 'What app would you like to use?')
  cancelText: 'This is the cancel button text', // optional (default: 'Cancel')
  appsWhiteList: ['google-maps'], // optionally you can set which apps to show (default: will show all supported apps installed on device)
  naverCallerName: 'com.example.myapp', // to link into Naver Map You should provide your appname which is the bundle ID in iOS and applicationId in android.
  // appTitles: { 'google-maps': 'My custom Google Maps title' }, // optionally you can override default app titles
  // app: 'uber',  // optionally specify specific app to use
  directionsMode: 'walk', // optional, accepted values are 'car', 'walk', 'public-transport' or 'bike'
});
      
  }, []);


  function getPermissionLocation() {
    try {
      const geo = Geolocation.getCurrentPosition(
        location => setcoords([location.coords.longitude, location.coords.latitude]),
        err => console.log(err),
        { enableHighAccuracy: true },
      );
      console.log('geo coords of the driver', coords)
      return true;

    } catch (err) {
      console.error('error getting location', error);
    }
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
      console.log(result.status);
      if (result.status === true) {
        const dest = result.datas.destinationLocation
        console.log(dest)
        setdcoords(dest);
        const pick = result.datas.pickupLocation
        console.log(pick)
        setpcoords(pick);
        console.log('the coordinates retrieved from server', dcoords,'er', pcoords)

        return true;
      }
    } catch (err) {
      console.log('asfdasdfsdf', err);
    }
  }

  function makeRouterFeature(long, lat) {
    let routerFeature = {
      type: 'FeatureCollection',
      features: [
        {
          type: 'Feature',
          properties: {},
          geometry: {
            type: 'LineString',
            coordinates: `${[long, lat]}`,
          },
        },
      ],
    };
    return routerFeature;
  }


  async function createRouterLine(pcoords, dcoords) {
    console.log('the directions data from here')
    const startCoords = `${[pcoords[0], pcoords[1]]}`;
    const endCoords = `${[dcoords[0], dcoords[1]]}`;
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
        console.log('the route direction data  gfgf', routerFeature)
        setrouteDirection(routerFeature)
      }
    } catch (err) {
      console.log(err);
    }
  }



  return (<View>
    <Text>ding ding</Text>
  </View>)/* (
    <View style={styles.page}>
      <View style={styles.container}>
        <MapView
          style={styles.map}
          onDidFinishLoadingMap={async () => {
            await createRouterLine([...pcoords], [...dcoords]);
          }}>
          <Camera zoomLevel={4} centerCoordinate={coords} />
            <ShapeSource
              id='line1'
              shape={routeDirection}
            >
              <LineLayer
                id='routerLine01'
                style={{
                  lineColor: '#fa9314',
                  lineWidth: 4
                }}
              />
            </ShapeSource>
          
          <UserLocation
            animated={true}
            androidRenderMode='gps'
            showsUserHeadingIndicator={true}
          />
        </MapView>
      </View>
    </View>
  ); */
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


export default DriverMap;