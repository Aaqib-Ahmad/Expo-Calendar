import React, { useState,useEffect } from "react";
import { StyleSheet, Text, View, Image, Button,FlatList } from "react-native";
import * as Google from "expo-google-app-auth";
import ListItem from "./ListItem";


export default function GoogleSignin ({navigation}) {

  const [signin,setSignin] = useState(false);
  const [accessToken,setAccessToken] = useState("");
  const[events,setEvents] = useState([]);
  const CALENDAR_ID = 'iie91udhph8sgmmgimto0mj8rs@group.calendar.google.com';
  const API_KEY = 'AIzaSyAp7HYKq-c39Hiu1YR-tdAA1I4-BhjCIlk';
  let url = `https://www.googleapis.com/calendar/v3/calendars/${CALENDAR_ID}/events?key=${API_KEY}`;

  const getEvents = async () => {
    try{
      const response = await fetch(url,{
        method: 'Get',
        headers: { Authorization: `Bearer ${accessToken}` },
        
      });
      const data = await response.json();
      setEvents(data.items);
      console.log(events);
    }
    catch(error){
      console.log(error);
    }
  };

  const signIn = async () => {
    try {
      const result = await Google.logInAsync({
        androidClientId:
          "874734806710-odmpk8u9tgr0qt2cm07rc91fm17hdfrm.apps.googleusercontent.com",
        scopes: ["https://www.googleapis.com/auth/calendar.events","https://www.googleapis.com/auth/calendar","https://www.googleapis.com/auth/userinfo.profile",
        "https://www.googleapis.com/auth/userinfo.email" ],
        redirectUrl:"host.exp.exponent:/oauth2redirect/google"
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
        
        <View style={styles.container}>
          <Button title="Get Events" onPress={() => getEvents()} />
          <FlatList
            data = {events}
            keyExtractor={(item)=>item.id}
            renderItem={({ item }) => (
              <ListItem
                name = {item.summary}
                StartTime={item.created}
                EndTime={item.end.dateTime}
              />
            )}
            
          />
          
          <Text>signed in</Text> 
      </View>
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
