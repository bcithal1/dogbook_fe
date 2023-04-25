import { getAllEventHostedByCurrentUser } from "@/queries/event.querues";
import { Flex } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import React from "react";
import EventManagementCard from "./EventManagementCard";


function ManageEvent() {
  const { data: session } = useSession();
  const { eventStatus, eventData } = getAllEventHostedByCurrentUser(
    session?.accessToken
  );
  

  //   const { DTOstatus, DTOdata } = getUserEventDto(
  //     session?.accessToken,
  //     session.user.id,
  //     event.eventId
  //   );
  if (eventStatus === "loading") {
    return <>is loading</>;
  }

  if (eventStatus === "error") {
    return <>error calling apis</>;
  }
  return (

    <Flex>
      {eventData.map((event) => (
        <EventManagementCard event={event} key={event.eventId} />
      ))}
    </Flex>
  );
}

export default ManageEvent;
