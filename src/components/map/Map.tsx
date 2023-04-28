import { GoogleMap, useLoadScript } from '@react-google-maps/api'
import React, { useEffect, useState } from 'react'

function Map() {

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
  const { isLoaded } =useLoadScript({
    googleMapsApiKey: "AIzaSyBTdPPxMhqY57yRHYoP9UnBqSNHib7Fcjk"
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
  
  if (!isLoaded) return <div>Loading...</div>

  return (
    <GoogleMap zoom={12} center={userLocation} mapContainerStyle={containerStyle} ></GoogleMap>
  )
}

export default Map