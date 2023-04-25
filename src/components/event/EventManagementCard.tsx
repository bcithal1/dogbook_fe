import React, { Fragment, useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Box,
  Badge,
  Image,
  Grid,
  GridItem,
  Flex,
  Center,
  
  Stack,
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
  Button,
} from "@chakra-ui/react";
import { Event } from "@/types/event";
import {
  AddIcon,
  CheckCircleIcon,
  ChevronDownIcon,
  StarIcon,
} from "@chakra-ui/icons";
import { useSession } from "next-auth/react";
import { getUserById } from "@/queries/user.queries";
import Media from "react-media";
import {
    hostAcceptUserApplication,
  hostInviteToEvent,
} from "@/queries/event.querues";
import {
  getAllUserEventDto,
  getUserEventDto,
} from "@/queries/userEventDTO.queries";
import { UserEventDTO } from "@/types/userEventDTO";


function EventManagementCard({ event }: { event: Event }) {
  const { data: session } = useSession();
  const { status, data } = getUserById(session?.accessToken, event.hostId);
  const { DTOListstatus, DTOListdata } = getAllUserEventDto(
    session?.accessToken,
    event.eventId
  );
  const hostInvite = hostInviteToEvent(session?.accessToken);
  const hostAcceptApplication = hostAcceptUserApplication(session?.accessToken)

  console.log(event.hostId, data, DTOListdata);

//   function onClickInvite(eventId, userId) {
//     hostInvite.mutate(eventId, userId);
//   }

  const onClickAccept = (event) => {
    let eventId = Number((event.target as HTMLElement).getAttribute("data-eventId"))
    let userId = Number((event.target as HTMLElement).getAttribute("data-userId"))
    console.log(eventId, userId)
    hostAcceptApplication.mutate({eventId, userId})
  }  

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
      borderRadius="lg"
      overflow="hidden"
      bg={"#886E58"}
      mb="5"
      fontFamily={"font-family: Arial, sans-serif;"}
      fontSize="2xl"
    >
      <Media
        queries={{ small: "(max-width:850px)", medium: "(min-width:850px)" }}
      >
        {(matches) => (
          <Fragment>
            {matches.medium && (
              <Box mx="2em" mt="2em"mb="2em">
                <Flex flexDirection={"column"} gap="2">
                  <Flex className="header">
                    <Image src="https://k8q3f6p8.rocketcdn.me/wp-content/uploads/2019/05/Google-Maps-Tips.png" borderRadius={"18"}/>
                  </Flex>
                  <Flex mt={"1em"}>{event.eventTitle}</Flex>
                  <Flex>{event.date}</Flex>
                  <Flex>{event.eventLocation}</Flex>
                  <Flex>{event.eventDescription}</Flex>
                  <Flex flexDirection={"row"} gap="18" >
                    <Button colorScheme={"teal"}>Invite all friends</Button>
                    <Button colorScheme={"teal"}>Update Event detail</Button>
                    
                  </Flex>

                  <Flex flexDirection={"row"} gap="5" flexWrap={"wrap"}>
                    {DTOListdata
                      ? DTOListdata.map((DTO) => {
                          return (
                            <Flex flexDirection={"column"} backgroundColor="#C2C0C7" width="180px" height="220px" gap={"1"} borderRadius="18">
                              <Flex>
                                <Avatar
                                  src={DTO.profilePhotoUrl}
                                
                                />
                              </Flex>
                              <Flex>{DTO.userName}</Flex>
                              <Flex>{DTO.eventInvitedStatus}</Flex>
                              <Flex>{DTO.goingStatus}</Flex>
                              
                              <Flex alignSelf={"center"}>{DTO.eventInvitedStatus.toLowerCase()==="applied"? <Button colorScheme={"teal"} data-eventId={DTO.eventId} data-userId={DTO.userId} onClick={(event)=>onClickAccept(event)} >Accept</Button>: null}</Flex>
                            </Flex>
                          );
                        })
                      : null}
                  </Flex>
                </Flex>
              </Box>
            )}

            {matches.small && <Box></Box>}
          </Fragment>
        )}
      </Media>
    </Box>
  );
}

export default EventManagementCard;
