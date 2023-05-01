import { getGeoCoding } from "@/queries/geocoding.queries";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Event } from "@/types/event";
import { Flex } from "@chakra-ui/react";
import Places from "./places";

type LatLngLiteral = google.maps.LatLngLiteral;
type DirectionasResult = google.maps.DirectionsResult;

function MapControl(props) {
  interface Location {
    lat: number;
    lng: number;
  }
  const containerStyle = {
    width: "800px",
    height: "400px",
    borderRadius: "0.5em",
  };
  
  const center = useMemo<LatLngLiteral>(()=>({lat:43,lng:-80}),[])
  const [eventLocation, setEventLoaction] = useState<LatLngLiteral>();
  const mapRef = useRef<GoogleMap>();

  const options = useMemo(
    () => ({
      disableDefaultUI: false,
      clickableIcons: true,
      mapId: "b96a4b9f690958ef",
    }),
    []
  );

  const { isLoaded } = useLoadScript({
    // googleMapsApiKey: "AIzaSyBTdPPxMhqY57yRHYoP9UnBqSNHib7Fcjk"
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_API,
    libraries: ["places"],
  });

  const onLoad = useCallback((map) => (mapRef.current = map), []);
  if(!isLoaded) return <div>Loading...</div>

  return (
    <Flex flexDirection={"column"}>
      <Flex>
        <Places
          setLocation={(position, address) => {
            console.log(position, address)
            setEventLoaction(position);
            props.handleCallback(address)
          }}
        />
      </Flex>
      <Flex>
        <GoogleMap
          zoom={12}
          center={eventLocation}
          mapContainerStyle={containerStyle}
          options={options}
        >
          <Marker position={eventLocation} />
        </GoogleMap>
      </Flex>
    </Flex>
  );
}

export default MapControl;
