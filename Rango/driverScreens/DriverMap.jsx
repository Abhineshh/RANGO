import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { DriverDetailsRoute } from '../APIroutes';
import Mapbox, { MapView, PointAnnotation, MarkerView, Camera, ShapeSource, LineLayer, UserLocation } from '@rnmapbox/maps';
import { MAPBOX_API_KEY } from '../config';
import axios from 'axios';
import { useSharedParams } from '../ParamContext';
import Geolocation from '@react-native-community/geolocation';

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
      getData();
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
        console.log('the coordinates retrieved from server', dcoords, pcoords)

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



  return (
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


export default DriverMap;