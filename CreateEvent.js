import React, {useState,useEffect} from 'react';
import {View,Pressable,StyleSheet, Platform, Text} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import SegmentedControl from '@react-native-segmented-control/segmented-control';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';

export default function CreateEvent ({navigation,route}){
  const {AccessToken} = route.params;
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [startMode, setStartMode] = useState('date');
  const [startShow, setStartShow] = useState(false);
  const [endMode, setEndMode] = useState('date');
  const [endShow, setEndShow] = useState(false);
  const [title,setTitle] = useState("");
  const [category,setCategory] = useState("");
  const [index,setIndex ] = useState(0);

  const CALENDAR_ID = 'iie91udhph8sgmmgimto0mj8rs@group.calendar.google.com';
  const API_KEY = 'AIzaSyAp7HYKq-c39Hiu1YR-tdAA1I4-BhjCIlk';
  let url = `https://www.googleapis.com/calendar/v3/calendars/${CALENDAR_ID}/events?key=${API_KEY}`;

  let customFonts = {
    'Inter-Medium': require('./assets/fonts/Inter-Medium.ttf'),
    'Inter-Regular': require('./assets/fonts/Inter-Regular.ttf'),
    'Inter-SemiBold': require('./assets/fonts/Inter-SemiBold.ttf'),
   };

   
  async function loadFontsAsync() {
    await Font.loadAsync(customFonts);
  }

  const onStartChange = (event, selectedDate) => {
    const currentDate = selectedDate || startDate;
    setStartShow(Platform.OS === 'ios');
    setStartDate(currentDate);
  };
  const onEndChange = (event, selectedDate) => {
    const currentDate = selectedDate || endDate;
    setEndShow(Platform.OS === 'ios');
    setEndDate(currentDate);
  };

  const startShowMode = (currentMode) => {
    setStartShow(true);
    setStartMode(currentMode);
  };
  const endShowMode = (currentMode) => {
    setEndShow(true);
    setEndMode(currentMode);
  };
  
  const showStartDatepicker = () => {
    startShowMode('date');
  };
  const showEndDatepicker = () => {
    endShowMode('date');
  };

  const showStartTimepicker = () => {
    startShowMode('time');
  };
  const showEndTimepicker = () => {
    endShowMode('time');
  };

const postEvent = async () => {
  console.log("pressed");
  const response = await fetch(url, {
    method: 'POST',
    headers: { Authorization: `Bearer ${AccessToken}`,
    'Accept':'application/json',
    'Content-Type':'application/json'
  },
    body: JSON.stringify([{
      summary: title,
      start: {
        dateTime: startDate,
      },
      end: {
        dateTime: endDate,
      },
      reminders: {
        useDefault: true,
      },
      eventType: category
      }])
  });
 
};


  useEffect(()=>{
    loadFontsAsync();
});

  return (
    <View>
      <Text style={styles.heading1}>Create New Event</Text>
      <Text style={styles.heading2}>Title</Text>
      <TextInput
        style = {styles.textinput}
        selectionColor={"#1665FA"}
        onChangeText={(text)=>setTitle(text)}
      />
      <Text style={styles.heading2}>Category</Text>
      <SegmentedControl
        values={['Work', 'Hangout' , 'Meeting', 'Festival']}
        selectedIndex={index}
        onChange={(event) => {
          setIndex( event.nativeEvent.selectedSegmentIndex);
        }}
        onValueChange={(value)=>setCategory(value)}
        backgroundColor='#F7F9FC'
        tintColor='#E2ECFD'
        fontStyle={{color:"#A8B4CB",fontFamily: 'Inter-Medium', fontSize: 13}}
        activeFontStyle={{color:"#1665FA",fontFamily: 'Inter-Medium', fontSize: 13}}       
      />
    
      <Text style={styles.heading2}>Date & Time</Text>
      {startShow && (
        <DateTimePicker
          testID="dateTimePicker"
          value={startDate}
          mode={startMode}
          is24Hour={true}
          display="spinner"
          onChange={onStartChange}
        />
      )}

      <View style={styles.startTimeSection}>
        <TouchableOpacity onPress={showStartDatepicker}>
          <View style={styles.sectionStyle}>
            <Ionicons name="calendar" size={20} color="#6C7C9B" />
                <TextInput
                    style = {styles.dateInput}
                    editable = {false}
                    value={startDate.getDate()+"/"+startDate.getMonth()+"/"+startDate.getFullYear()}
            />            
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={showStartTimepicker}>
          <View style={styles.sectionStyle}>
            <Ionicons name="time" size={20} color="#6C7C9B" />
                <TextInput
                    style = {styles.dateInput}
                    editable = {false}
                    value={startDate.getHours()+":"+startDate.getMinutes()+":"+startDate.getSeconds()}
                />            
          </View>
        </TouchableOpacity>
      </View>

      <View
        style={{
          borderBottomColor: "#1665FA",
          borderBottomWidth: 0.5,
          paddingBottom:10,
          marginRight:180,
          marginLeft:20,
          marginBottom:10
        }}
      />

     {/* For End DateTime: */}

      {endShow && (
        <DateTimePicker
          testID="dateTimePicker"
          value={endDate}
          mode={endMode}
          is24Hour={true}
          display="spinner"
          onChange={onEndChange}
        />
      )}

      <View style={styles.startTimeSection}>
        <TouchableOpacity onPress={showEndDatepicker}>
          <View style={styles.sectionStyle}>
            <Ionicons name="calendar" size={20} color="#6C7C9B" />
                <TextInput
                    style = {styles.dateInput}
                    editable = {false}
                    value={endDate.getDate()+"/"+endDate.getMonth()+"/"+endDate.getFullYear()}
            />            
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={showEndTimepicker}>
          <View style={styles.sectionStyle}>
            <Ionicons name="time" size={20} color="#6C7C9B" />
                <TextInput
                    style = {styles.dateInput}
                    editable = {false}
                    value={endDate.getHours()+":"+endDate.getMinutes()+":"+endDate.getSeconds()}
                />            
          </View>
        </TouchableOpacity>
      
      </View>
      

    <Pressable style={styles.saveEventButton} onPress={postEvent}>
      <Text style={styles.saveEventText}>Save Event</Text>
    </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({

heading1:{
    color: "#202630",
    paddingLeft:20,
    fontSize: 24,
	  fontWeight: "500",
  	fontFamily: 'Inter-SemiBold',
	  letterSpacing: 0,
	  textAlign: "left",
    },
  heading2:{
    color: "#7386AA",
    paddingLeft:20,
    paddingTop:20,
    paddingBottom:20,
    fontSize: 14,
    fontWeight: "500",
    fontFamily: 'Inter-SemiBold',
    letterSpacing: 0,
    textAlign: "left",
    },
    textinput:{
      height: 40,
      marginLeft: 20,
      marginRight: 20,
      borderWidth: 1,
      borderColor:"#E5E9F3",
      borderRadius:10,
      paddingTop: 0, paddingBottom: 0,
      paddingLeft:20,
      paddingRight:20,
        
      },

      dateInput:{
        height: 40,
        width:120,
        marginLeft: 20,
        marginRight: 200,
        borderWidth: 1,
        borderColor:"#E5E9F3",
        borderRadius:10,
        paddingTop: 0, paddingBottom: 0,
        paddingLeft:20,
        paddingRight:20,
          
        },
        sectionStyle: {
          flexDirection: 'row',
          //justifyContent: 'center',
          alignItems: 'center',
          paddingLeft:20,
          paddingRight:70
        },
        startTimeSection:{          
          flexDirection: 'column',
          justifyContent: 'center',         
        },

        saveEventButton: {
          alignItems: 'center',
          justifyContent: 'center',
          paddingVertical: 12,
          paddingHorizontal: 50,
          marginTop:10,
          marginRight:50,
          marginLeft:50,
          borderRadius: 10,          
          backgroundColor: '#1665FA',
        },
        saveEventText: {
          fontSize: 15,
          lineHeight: 21,
          fontFamily:"Inter-Medium",
          letterSpacing: 0.25,
          color: 'white',
        },
});
