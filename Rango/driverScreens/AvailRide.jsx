import React from 'react';
import {View,Button,Text,ScrollView,StyleSheet} from 'react-native';
import { AvailRideRoute } from '../APIroutes';

const AvailRide = function({navigation}){
    const AvailableRides = ['ding',"ting","bing","sing",'zing'];



    return(
         
       <ScrollView style={styles.container}>
       {
        AvailableRides.map((AvailableRides,index)=>{
            return(
                <View style={styles.card} key={index} onPress={()=>{'DriverHome'}}>
                    <Text>{AvailableRides} </Text>
                    <Text>{index}</Text>
                    <Button title={"i am ready for this ride"} onPress={()=>{navigation.navigate('DriverHome')}}/>
                </View>
            )
        })
       }
           
      
       </ScrollView>
       
    );
}



const styles = StyleSheet.create({
    container: {
        
        backgroundColor: '#BBB',
         width:'100%',
       
     
    },
    card:{
        backgroundColor:'#fff',
        marginTop:25,
        marginBottom:25,
        height:'29%',
        width:'90%',
        borderRadius:10,
        padding:15,
    },
});
export default AvailRide;