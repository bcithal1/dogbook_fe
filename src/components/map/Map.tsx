import { getGeoCoding } from '@/queries/geocoding.queries';
import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api'
import React, { useEffect, useState } from 'react'
import { Event } from "@/types/event";
const libraries = ["places"] as any

function Map({event}:{event:Event}) {

  interface Location {
    lat: number;
    lng: number;
  }
  const containerStyle = {
    width: '800px',
    height: '400px',
    borderRadius:"0.5em"
  };
  const [userLocation, setUserLocation] = useState<Location | null>(null);

  const {status, data} = getGeoCoding(event.eventLocation)

  const { isLoaded } =useLoadScript({
    googleMapsApiKey: "AIzaSyBTdPPxMhqY57yRHYoP9UnBqSNHib7Fcjk",
    // googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_API,
    libraries: libraries
    
  })  


  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const location = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        setUserLocation(location);
      });
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }, []);
  
  if (!isLoaded || status=="loading") return <div>Loading...</div>

  if(status=="error") return <div>event address has no geolocation associated</div>

  console.log(data.results[0])
  
  return (
    <GoogleMap zoom={12} center={userLocation} mapContainerStyle={containerStyle} ><Marker position={userLocation} /></GoogleMap>
  )
}

export default Map