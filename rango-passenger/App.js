import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import PassengerOrDriver from './pages/PassengerOrDriver';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Chooser from './pages/Chooser';
import Loading from './components/Loading';

export default function App() {




  return (
    <ScrollView style={styles.container}>
      <Loading/>
      <Login />
      <Chooser/>
      <Signup/>
      <PassengerOrDriver/>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
    container:{
      margin :'1%',
    },
});
