import React from 'react';
import {MapboxGL} from '@rnmapbox/maps';
import { MAPBOX_API_KEY } from './config';
import {View} from 'react-native';

MapboxGL.setAccessToken(MAPBOX_API_KEY);

function Zoro() {



  return (
    <View>
         <MapboxGL.MapView>
            
         </MapboxGL.MapView>
    </View>
   
  )
}
export default Zoro;