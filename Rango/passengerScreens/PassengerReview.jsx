import React, { useState } from 'react';
import { View, Button, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';
import { useSharedParams } from '../ParamContext';
import { PassengerReviewRoute } from '../APIroutes';

const PaassengerReview = function ({ navigation }) {
  const { sharedParams } = useSharedParams();
  const Currentuser = sharedParams.CurrentUser;
  const Rangorideid = sharedParams.RangoRideId;

  const [review, setreview] = useState(Number);



  const handleValidation = () => {

    const reviewRegex = /^[0-9]{1,1}$/;
    if (review === "" || !reviewRegex.test(review) || review.length > 1 || review.length < 1) {
      Alert.alert('Rating should be within 0 and 9');
      return false;
    }
    return true;
  };


  const SubmitReview = async () => {
    try {
      if (!handleValidation) {
        return 0;
      }
      const response = await axios.post(PassengerReviewRoute, {
        review,
        Rangorideid,
      });
      if (response.data.status == true) {
        console.log("it works")
        Alert.alert('Posted', 'The Review was posted Successfully');
        navigation.reset({
            index:0,
            routes:[{name:'Chooser'}]
        });
      }
      if (response.data.status == false) {
        console.log('it did not work');
        Alert.alert('Not Posted', "The Reiview could not be Posted try Againg");
      }

    }
    catch (err) {
      console.log(err)
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Enter Your Reviews
      </Text>
      <TextInput
        style={styles.inputText}
        placeholder="Enter the Rating"
        placeholderTextColor="#003f5c"
        onChangeText={text => {
          setreview(text)
        }}
      />
      <TouchableOpacity
        onPress={() => {
          SubmitReview()
        }}
        style={styles.loginBtn}>
        <Text style={styles.loginText}>DONE</Text>
      </TouchableOpacity>
    </View>
  );
}

export default PaassengerReview;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#BBB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginBtn: {
    width: "100%",
    backgroundColor: "#00abf0",
    borderRadius: 25,
    height: 70,
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
  },
  inputText: {
    height: 60,
    color: "white"
  },
  title: {
    fontWeight: "bold",
    fontSize: 25,
    color: "#fb5b5a",
    marginBottom: 40,
    marginTop: 40,
  },
  inputView: {
    width: "80%",
    backgroundColor: "#888",
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    justifyContent: "center",
    padding: 20
  },
});