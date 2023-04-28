import CreateEvent from "@/pages/create-event";
import { Box, Button, Flex, Heading, useMediaQuery } from "@chakra-ui/react";
import React, { Fragment, useState } from "react";
import EventList from "./EventList";
import ManageEvent from "./ManageEvent";

function EventPanel() {
  const [eventListHasRender, setEventListRender] = useState(false);
  const [createEventRender, setCreateEventRender] = useState(false);
  const [manageEventRender, setManageEventRender] = useState(false);

  // ssr-friendly media query with fallback
  const [isLargerThan800] = useMediaQuery("(min-width: 800px)", {
    ssr: true,
    fallback: false, // return false on the server, and re-evaluate on the client side
  });

  const onShowEventList = () => {
    setEventListRender(true);
    setCreateEventRender(false);
    setManageEventRender(false);
  };

  const onShowCreateEvent = () => {
    setEventListRender(false);
    setCreateEventRender(true);
    setManageEventRender(false);
  };

  const onShowManageEvent = () => {
    setEventListRender(false);
    setCreateEventRender(false);
    setManageEventRender(true);
  };

  return (
    <Box>
      {isLargerThan800 ? (
        <Flex flexDirection="row" >
          <Flex backgroundColor={"#886E58"} minHeight="100vh">
            <Box>
              <Flex mx={"3em"} alignItems={"center"} flexDirection="column">
                <Flex pt="50%">
                  <Heading>Menu</Heading>
                </Flex>
                <Flex pt="50%">
                  <Button onClick={onShowEventList}>Event List</Button>
                </Flex>
                <Flex pt="50%">
                  <Button onClick={onShowCreateEvent}>Create Event</Button>
                </Flex>
                <Flex pt="50%">
                  <Button onClick={onShowManageEvent}>Manage Event</Button>
                </Flex>
              </Flex>
            </Box>
          </Flex>

          <Flex ml={"15%"}>
            {eventListHasRender && <EventList />}
            {createEventRender && <CreateEvent />}
            {manageEventRender && <ManageEvent />}
            
          </Flex>

          
        </Flex>
      ) : (
        <Flex flexDirection="column">
          <Flex backgroundColor={"#886E58"}>
            <Box>
              <Flex mx={"3em"} flexDirection="row" gap={2} justifyContent="space-evenly">
                
                <Flex pt="10%">
                  <Button onClick={onShowEventList}>Event List</Button>
                </Flex>
                <Flex pt="10%">
                  <Button onClick={onShowCreateEvent}>Create Event</Button>
                </Flex>
                <Flex pt="10%">
                  <Button onClick={onShowManageEvent}>Manage Event</Button>
                </Flex>
              </Flex>
            </Box>
          </Flex>

          <Flex ml={"15%"}>
            {eventListHasRender && <EventList />}
            {createEventRender && <CreateEvent />}
            {manageEventRender && <ManageEvent />}
          </Flex>
        </Flex>
      )}
    </Box>
  );
}

export default EventPanel;
