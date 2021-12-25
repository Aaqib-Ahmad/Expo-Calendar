import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function ListItem({ name, StartTime, EndTime}) {
  return (
          
      <View >
        <Text style={{ fontSize: 20 }}>{name}</Text>
        <Text style={{ fontSize: 16 }}>{StartTime}</Text>
        <Text style={{ fontSize: 14 }}>{EndTime}</Text>
      </View>
    
  );
}

const styles = StyleSheet.create({});
