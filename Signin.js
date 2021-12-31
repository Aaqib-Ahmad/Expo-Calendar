import React, { useState,useEffect } from "react";
import { StyleSheet, Text, View, Image, Button,FlatList } from "react-native";
import * as Google from "expo-google-app-auth";
import * as Config from './config.js';

export default function GoogleSignin ({navigation}) {

  const [signin,setSignin] = useState(false);
  const [accessToken,setAccessToken] = useState("");
  

  

  const signIn = async () => {
    try {
      const result = await Google.logInAsync({
        androidClientId: Config.clientId,          
        scopes: Config.scopes,
        redirectUrl: Config.redirectUrl
      });

    
      if (result.type === "success") {
        setSignin(true);
        setAccessToken(result.accessToken);
        
      } else {
        console.log("cancelled");
      }
    } catch (e) {
      console.log("error", e);
    }
  };
  
    return (
     
      <View style={styles.container}>
      {signin ? (
        
        navigation.navigate("Calendar",{AccessToken:accessToken})
      
      ) : (
        <View>
         <Text style={styles.header}>Sign In With Google</Text>
         <Button title="Sign in with Google" onPress={() => signIn()} />
         
       </View>
      )}
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
  header: {
    fontSize: 25,
  },
  image: {
    marginTop: 15,
    width: 150,
    height: 150,
    borderColor: "rgba(0,0,0,0.2)",
    borderWidth: 3,
    borderRadius: 150,
  },
});
