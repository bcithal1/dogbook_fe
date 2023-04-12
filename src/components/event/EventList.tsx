import { getAllEvent } from '@/queries/event.querues';
import { useSession } from 'next-auth/react';
import React from 'react'
import EventCard from './EventCard';

function EventList() {


  const { data: session } = useSession();
	const {status,data} = getAllEvent(session?.accessToken);
  if (status === "error") {
    return <div>error</div>;
  }

  if (status === "loading") {
    return <div>loading</div>;
  }
  if (status === "success" && data !== undefined) {
    if (data.length === 0) {
      return <>No husqs posted yet!</>;
    }
    return (
      <div
        style={{
          textAlign: "center",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        {data.map((event) =>
          <EventCard event={event} /> 
        )}
      </div>
    );
  } 
}

export default EventList