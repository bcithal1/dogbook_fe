import { getAllEvent } from "@/queries/event.querues";
import { useSession } from "next-auth/react";
import React from "react";
import EventCard from "../event/EventCard";
import EventNotification from "./EventNotification";
import { Flex } from "@chakra-ui/react";

function EventNotify() {
  const { data: session } = useSession();
  const { status, data } = getAllEvent(session?.accessToken);

  if (status === "error") {
    return <div>error</div>;
  }

  if (status === "loading") {
    return <div>loading</div>;
  }
  if (status === "success" && data !== undefined) {
    if (data.length === 0) {
      return (
        <>
          <Flex justifyContent={"center"}>No events posted yet!</Flex>
        </>
      );
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
        {data.map((event) => (
          <EventNotification event={event} key={event.eventId} />
        ))}
      </div>
    );
  }
}

export default EventNotify;
