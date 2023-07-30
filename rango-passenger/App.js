import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working oksfjlksdjfk
        asjfdlksjf
        sdkfjlskjf
        kdjf;laksn your app!</Text>
      <StatusBar style="auto" />
      <Text>i am ultra legend</Text>
      <ScrollView style={styles.jar}>
        <View>
          <Text>
            ding ding
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection:'column',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  jar :{
    backgroundColor:'#000',
    width:'90%',
  },
});
