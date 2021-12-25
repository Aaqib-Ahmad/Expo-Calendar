import { StyleSheet, Text, View } from "react-native";
import React, { useState, useRef, useEffect } from "react";
import GoogleSignin from "./Signin";
import EventCalendar from "./Calendar"
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-gesture-handler';

const Stack = createStackNavigator();

export default function App() {
  
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Signin">
        <Stack.Screen name="Signin" component={GoogleSignin}/>
        <Stack.Screen name="Calendar" component={EventCalendar}/>
      </Stack.Navigator>
    </NavigationContainer>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
