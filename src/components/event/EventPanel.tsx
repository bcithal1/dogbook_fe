import CreateEvent from "@/pages/create-event";
import { Box, Button, Flex, Heading } from "@chakra-ui/react";
import React, { Fragment, useState } from "react";
import Media from "react-media";
import EventList from "./EventList";
import ManageEvent from "./ManageEvent";

function EventPanel() {
  const [eventListHasRender, setEventListRender] = useState(false);
  const [createEventRender, setCreateEventRender] = useState(false);
  const [manageEventRender, setManageEventRender] = useState(false);

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
    <Media
      queries={{ small: "(max-width:850px)", medium: "(min-width:850px)" }}
    >
      {(matches) => (
        <Fragment>
          {matches.medium && (
            <Flex flexDirection="row">
              <Flex backgroundColor={"#886E58"}>
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
          )}

          {matches.small && (
            <Flex flexDirection="column">
              <Flex backgroundColor={"#886E58"}>
                <Box>
                  <Flex mx={"3em"} alignItems={"center"} flexDirection="row" mb={"3em"}>
                    <Flex pt="10%">
                      <Heading opacity={0}>Menu</Heading>
                    </Flex>
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
        </Fragment>
      )}
    </Media>
  );
}

export default EventPanel;
