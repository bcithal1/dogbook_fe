
import { GoogleMap, MarkerF, useLoadScript } from '@react-google-maps/api'
import React, {  useEffect, useState } from 'react'
import { Event } from "@/types/event";
import { useSession } from 'next-auth/react';
import { getUserById } from '@/queries/user.queries';


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

  const { data: session } = useSession();
  const { status, data } = getUserById(session?.accessToken, event.hostId);
  const [userLocation, setUserLocation] = useState<Location | null>(null);
  const [eventLocation, setEventLocation] = useState<Location | null>(null);


  const { isLoaded } =useLoadScript({
    googleMapsApiKey: "AIzaSyBTdPPxMhqY57yRHYoP9UnBqSNHib7Fcjk",
    // googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_API,
    libraries: libraries
    
  })

 

  useEffect(() => {

    setEventLocation({lat:event.lat, lng:event.lng})
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

  if(status=="error") return <div>event host user information error</div>

  
  
  return (
    <GoogleMap zoom={12} center={eventLocation} mapContainerStyle={containerStyle} ><MarkerF position={eventLocation} /></GoogleMap>
  )
}

export default Map