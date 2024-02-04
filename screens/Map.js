import { StyleSheet } from "react-native";
import MapView from "react-native-maps";
import { useEffect, useState } from 'react';
import * as Location from 'expo-location'


export default function Map(){
    useEffect(()=>{
        (async() => {
            getUserPosition()
        })()
    },[])
    const [location, setLocation] = useState({
        latitude: 65.0800,
        longitude: 25.4800,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
      })
      const getUserPosition = async () => {
        let {status} = await Location.requestForegroundPermissionsAsync()
        try{
            console.log(status)
            if(status !== 'granted'){
                console.log('Geolocation failed')
                return
            }
            const position = await Location.getCurrentPositionAsync({accuracy: Location.Accuracy.High})
            setLocation({...location,"latitude": position.coords.latitude,"longitude":position.coords.longitude})
        } catch (error){
            console.log(error)
        }
    }
    return ( 
        <MapView style={styles.map} region={location} showsUserLocation={true}/>
    )
}

const styles = StyleSheet.create({
    map: {
        height: '100%',
        width: '100%'
    }
})