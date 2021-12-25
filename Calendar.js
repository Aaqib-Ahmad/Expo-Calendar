import React, { useEffect,useState } from "react";
import { StyleSheet, Text, View, Image, Button,FlatList,Modal } from "react-native";
import * as Font from 'expo-font';

export default function EventCalendar() {
 
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
    
      async function loadFontsAsync() {
        await Font.loadAsync(customFonts);
      }

    const data = [{
        id:1,
        name:'Talha'
    },{   id:2,
        name:'Ahmed'
    }];
      
    
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
                    data={data}
                    keyExtractor={(item)=>item.id}        
                    renderItem={(item)=>
                        <View>
                            
                            <View>
                                <Text style={styles.ScheduleTime}>08:00</Text>
                                <View style={{borderRadius:15,textAlign: 'left',flex: 1,backgroundColor:"#E1F8FF",flexDirection:"column",paddingTop:10,paddingBottom:50,marginLeft:50,marginRight:30}}>
                                    
                                    <Text style={styles.EventHeading}>Hello</Text> 
                                    <Text style={styles.EventDuration}>1.5 hours</Text>
                                </View>
                                <Text style={styles.ScheduleTime}>09:00</Text>            
                            </View>
                            
                               
                        </View>
                        
                    }
                />
            </View>
        </Modal>

        <Button
            title="Open Modal"
            onPress={()=>setModalOpen(true)}
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
