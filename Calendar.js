import React, { useEffect,useState } from "react";
import { StyleSheet, Text, View, Image, Button,FlatList,Modal } from "react-native";
import * as Font from 'expo-font';

export default function EventCalendar({navigation,route}) {
    const {AccessToken} = route.params;
    let [modalOpen, setModalOpen] = useState(false);
    let customFonts = {
        'Inter-Black': require('./assets/fonts/Inter-Black.ttf'),
        'Inter-Bold': require('./assets/fonts/Inter-Bold.ttf'),
        'Inter-ExtraBold': require('./assets/fonts/Inter-ExtraBold.ttf'),
        'Inter-ExtraLight': require('./assets/fonts/Inter-ExtraLight.ttf'),
        'Inter-Light': require('./assets/fonts/Inter-Light.ttf'),
        'Inter-Medium': require('./assets/fonts/Inter-Medium.ttf'),
        'Inter-Regular': require('./assets/fonts/Inter-Regular.ttf'),
        'Inter-SemiBold': require('./assets/fonts/Inter-SemiBold.ttf'),
        'Inter-Thin': require('./assets/fonts/Inter-Thin.ttf'),
      };

      const[events,setEvents] = useState([]);
      const[date,setDate] = useState("");
      const CALENDAR_ID = 'iie91udhph8sgmmgimto0mj8rs@group.calendar.google.com';
      const API_KEY = 'AIzaSyAp7HYKq-c39Hiu1YR-tdAA1I4-BhjCIlk';
      let url = `https://www.googleapis.com/calendar/v3/calendars/${CALENDAR_ID}/events?key=${API_KEY}`;

      const handleTime = (data) =>{
            let date = new Date(data);
            let hrs = date.getHours()
            let mins = date.getMinutes()
            if(hrs<=9)
                hrs = '0' + hrs
            if(mins<10)
                mins = '0' + mins
            const postTime= hrs + ':' + mins
            return postTime.toString()
            
      }
      const getEvents = async () => {
        try{
          const response = await fetch(url,{
            method: 'Get',
            headers: { Authorization: `Bearer ${AccessToken}` },
            
          });
          const data = await response.json();
          setEvents(data.items);
          console.log(events);
        }
        catch(error){
          console.log(error);
        }
      };

      async function loadFontsAsync() {
        await Font.loadAsync(customFonts);
      }
     
    
    useEffect(()=>{
        loadFontsAsync();
    })
return(
    <View style={styles.containerContent}>
        <Modal 
            visible={modalOpen}
            animationType='slide'
        >
            <View >
                <Button
                    title="Close"
                    onPress={()=>setModalOpen(false)}

                />
                <Text style={styles.ScheduleHeading}>Schedule</Text>
                <FlatList
                    data={events}
                    keyExtractor={(item)=>item.id}   
                    contentContainerStyle={{ paddingBottom: 100 }}     
                    renderItem={({item})=>
                        <View>
                            
                            <View>
                                <Text style={styles.ScheduleTime}>{handleTime(item.start.dateTime) }</Text>
                                <View style={{borderRadius:15,textAlign: 'left',flex: 1,backgroundColor:"#E1F8FF",flexDirection:"column",paddingTop:20,paddingBottom:20,marginLeft:50,marginRight:30}}>
                                    
                                    <Text style={styles.EventHeading}>{item.summary}</Text> 
                                    <Text style={styles.EventDuration}>{item.eventType}</Text>
                                    <Text style={styles.EventDuration}>{item.creator.email}</Text>
                                </View>
                                <Text style={styles.ScheduleTime}>{handleTime(item.end.dateTime) }</Text>            
                            </View>
                            
                               
                        </View>
                        
                    }
                />
            </View>
        </Modal>

        <Button
            title="Open Modal"
            onPress={()=>{
                getEvents();
                setModalOpen(true);                
            }}
        />
    </View>
    
  );    
}

const styles = StyleSheet.create({
  containerContent: {flex: 1, marginTop: 40},
  containerHeader: {
    flex: 1,
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    backgroundColor: '#F1F1F1',
  },
  headerContent:{
    marginTop: 0,
  },
  Modal: {
    backgroundColor: '#005252',
    marginTop: 0,
  },
  ScheduleTime:{
   
	color: "#9CA9C3",
    
    paddingLeft:20,
    paddingTop:10,
	fontSize: 13,
	fontWeight: "500",
	fontFamily: 'Inter-Light',
	letterSpacing: 0,
	textAlign: "left",
	},

    EventHeading:{
    color: "#202630",
    paddingLeft:20,
    fontSize: 13,
	fontWeight: "500",
	fontFamily: 'Inter-Medium',
	letterSpacing: 0,
	textAlign: "left",
    },
    EventDuration:{
        color: "#353C49",
        paddingLeft:20,
        paddingTop:10,
        fontSize: 12,
        fontWeight: "500",
        fontFamily: 'Inter-Regular',
        letterSpacing: 0,
        
        textAlign: "left",
        },
ScheduleHeading:{
    color: "black",
    paddingLeft:20,
    fontSize: 20,
	fontWeight: "500",
	fontFamily: 'Inter-SemiBold',
	letterSpacing: 0,
	textAlign: "left",
    }
});
