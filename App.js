import { StyleSheet, Text, View } from "react-native";
import React, { useState, useRef, useEffect } from "react";
import GoogleSignin from "./Signin";
import EventCalendar from "./Calendar"
export default function App() {
  
  return (
    <View style={styles.container}>
      <EventCalendar />
      
    </View>
    
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
