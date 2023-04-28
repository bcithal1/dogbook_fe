import React, { Fragment, useState } from "react";
import {
  Box,
  Flex,
  Avatar,
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverBody,
} from "@chakra-ui/react";
import { Event } from "@/types/event";
import { useSession } from "next-auth/react";
import { getUserById } from "@/queries/user.queries";
import { hostAcceptUserApplication } from "@/queries/event.querues";
import { getAllUserEventDto } from "@/queries/userEventDTO.queries";
import UpdateEvent from "./UpdateEvent";
import UserList from "../user/UserList";
import Map from "../map/Map";

function EventManagementCard({ event }: { event: Event }) {
  const { data: session } = useSession();
  const { status, data } = getUserById(session?.accessToken, event.hostId);
  const { DTOListstatus, DTOListdata } = getAllUserEventDto(
    session?.accessToken,
    event.eventId
  );

  const hostAcceptApplication = hostAcceptUserApplication(session?.accessToken);

  console.log(event.hostId, data, DTOListdata);

  const initialFocusRef = React.useRef();

  const onClickAccept = (event) => {
    let eventId = Number(
      (event.target as HTMLElement).getAttribute("data-eventId")
    );
    let userId = Number(
      (event.target as HTMLElement).getAttribute("data-userId")
    );
    console.log(eventId, userId);
    hostAcceptApplication.mutate({ eventId, userId });
  };

  if (DTOListstatus === "loading") {
    return <>"is loading"</>;
  }

  if (DTOListstatus === "error") {
    return <>"there is an error for getUserDtoList call"</>;
  }

  return (
    <Box
      w="80%"
      borderWidth="1px"
      borderRadius="1.5em"
      overflow="hidden"
      bg={"#886E58"}
      mb="5"
      fontFamily={"font-family: Arial, sans-serif;"}
      fontSize="3xl"
      fontStyle={"italic"}
    >
      <Box mx="2em" mt="2em" mb="2em">
        <Flex flexDirection={"column"} gap="2">
          <Flex className="header" justifyContent={"center"}>
            <Map />
          </Flex>
          <Flex mt={"1em"}>{event.eventTitle}</Flex>
          <Flex>{event.date}</Flex>
          <Flex>{event.eventLocation}</Flex>
          <Flex>{event.eventDescription}</Flex>
          <Flex flexDirection={"row"} gap="18">
            <Button colorScheme={"teal"}>Invite all friends</Button>
            <Popover
              initialFocusRef={initialFocusRef}
              placement="bottom"
              closeOnBlur={false}
            >
              <PopoverTrigger>
                <Button colorScheme={"teal"}>update Event</Button>
              </PopoverTrigger>
              <PopoverContent
                color="white"
                bg="blue.800"
                borderColor="blue.800"
                boxSize={"500 500"}
              >
                <PopoverArrow />
                <PopoverCloseButton />
                <PopoverBody>
                  <UpdateEvent event_Id={event.eventId} />
                </PopoverBody>
              </PopoverContent>
            </Popover>

            <Popover
              initialFocusRef={initialFocusRef}
              placement="bottom"
              closeOnBlur={false}
            >
              <PopoverTrigger>
                <Button colorScheme={"teal"}>Invite User</Button>
              </PopoverTrigger>
              <PopoverContent
                color="white"
                bg="blue.800"
                borderColor="blue.800"
                boxSize={"500 500"}
              >
                <PopoverArrow />
                <PopoverCloseButton />
                <PopoverBody>
                  <UserList eventId={event.eventId} />
                </PopoverBody>
              </PopoverContent>
            </Popover>
          </Flex>
          <Box>
            <Flex mt="1.5em" fontFamily={"sans-serif"}
                        fontSize="33" justifyContent={"center"}>RSVP</Flex>
            <Flex
              flexDirection={"row"}
              gap="5"
              flexWrap={"wrap"}
              mt="2em"
              justifyContent={"center"}
            >
              {DTOListdata
                ? DTOListdata.map((DTO) => {
                    return (
                      <Flex
                        flexDirection={"column"}
                        backgroundColor="#C2C0C7"
                        width="180px"
                        height="190px"
                        gap={"1.5"}
                        borderRadius="18"
                        fontFamily={"sans-serif"}
                        fontSize="16"
                      >
                        <Flex>
                          <Avatar src={DTO.profilePhotoUrl} />
                        </Flex>
                        <Flex ml={"2"}>{DTO.userName}</Flex>
                        <Flex ml={"2"}>{DTO.eventAccessLevel==="EVENT_HOST"? "Host": "Guest"}</Flex>
                        <Flex ml={"2"} color="teal">
                          {DTO.eventInvitedStatus} {DTO.goingStatus}
                        </Flex>

                        <Flex alignSelf={"center"}>
                          {DTO.eventInvitedStatus.toLowerCase() ===
                          "applied" ? (
                            <Button
                              colorScheme={"teal"}
                              data-eventId={DTO.eventId}
                              data-userId={DTO.userId}
                              onClick={(event) => onClickAccept(event)}
                            >
                              Accept
                            </Button>
                          ) : null}
                        </Flex>
                      </Flex>
                    );
                  })
                : null}
            </Flex>
          </Box>
        </Flex>
      </Box>
    </Box>
  );
}

export default EventManagementCard;
