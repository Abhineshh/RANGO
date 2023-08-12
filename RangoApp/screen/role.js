import {React} from 'react';
import {View,TouchableOpacity,Text,StyleSheet,Button} from 'react-native';




const Role = function({navigation}){

    return(
       <View style={styles.buttons}>
       <Button title="i am a Driver" style={styles.buttons}/>
       <Button title="i am a Passenger"/>
       </View>
    );
}

const styles = StyleSheet.create({

    buttons:{
        margin:'5px',
        backgroundColor:'red',
    },
});

export default Role;