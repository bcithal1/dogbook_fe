import React, { Fragment } from "react";
import { Box, Image, Grid, Flex, Text, Link, Center } from "@chakra-ui/react";
import { Event } from "@/types/event";
import { useSession } from "next-auth/react";
import { getUserById } from "@/queries/user.queries";
import Media from "react-media";
import { Link as ReachLink } from "@reach/router";
import {
  userAcceptEventInvite,
  userApplyToUninvitedEvent,
} from "@/queries/event.querues";
import { getUserEventDto } from "@/queries/userEventDTO.queries";

function EventNotification({ event }: { event: Event }) {
  const { data: session } = useSession();
  const { status, data } = getUserById(session?.accessToken, event.hostId);
  const userAcceptInvite = userAcceptEventInvite(session?.accessToken);
  const userApplyForEvent = userApplyToUninvitedEvent(session?.accessToken);
  const { DTOstatus, DTOdata } = getUserEventDto(
    session?.accessToken,
    session.user.id,
    event.eventId
  );

  console.log(event.hostId, data, DTOdata);

  function onAccept() {
    userAcceptInvite.mutate(event.eventId);
  }

  function onApply() {
    userApplyForEvent.mutate(event.eventId);
  }

  return (
    <Box
      w="96%"
      borderWidth="1px"
      borderRadius="20px"
      overflow="hidden"
      bg={"#ffffff"}
      m="3"
      fontFamily={"font-family: Arial, sans-serif;"}
      fontSize={"small"}
      color={"black"}
    >
      <Link
        as={ReachLink}
        textDecoration={"none"}
        textDecoration_hover={"none"}
        ahref_hover={"none"}
        to="/event"
      >
        <Media
          queries={{ small: "(max-width:250px)", medium: "(min-width: 350px)" }}
        >
          {(matches) => (
            <Fragment>
              {matches.medium && (
                <Grid
                  bg="#F5F2EA"
                  templateAreas={`"nav header time"
                  "nav main footer"
                  "nav main footer"`}
                  gridTemplateRows={"1fr 2fr"}
                  gridTemplateColumns={"1.5fr 5fr 3fr"}
                  h="100px"
                  gap="1"
                  color="black"
                  justifyContent="left"
                >
                  <Flex
                    flexDirection="column"
                    justifyContent={"left"}
                    bg="#F5F2EA"
                  >
                    <Flex ml="1em" color="black" bg="#F5F2EA" w={"75px"}>
                      {status == "error"
                        ? "User does Not Exist"
                        : status == "loading"
                        ? "loading user information"
                        : data.fullName}
                    </Flex>
                    <Flex
                      mb="1em"
                      ml="2em"
                      bg="#F5F2EA"
                      // h={"100px"}
                      // justifyContent={"center"}
                    >
                      <Center>
                        <Image
                          src={
                            status == "error"
                              ? "User Not Exist"
                              : status == "loading"
                              ? "loading user information"
                              : data.profilePhotoUrl
                          }
                          // alignSelf={"center"}
                          alt={`Picture of ${
                            status == "error"
                              ? "User Not Exist"
                              : status == "loading"
                              ? "loading user information"
                              : data.fullName
                          }`}
                          rounded="2em"
                          width="3em"
                          height="3em"
                          boxShadow={
                            "0px 1px 18px -5px rgb(0 0 0 / 57%), 0 10px 10px -5px rgb(0 0 0 / 45%)"
                          }
                        />
                      </Center>
                    </Flex>
                  </Flex>
                  <Flex
                    ml="1em"
                    bg="#F5F2EA"
                    flexDirection="column"
                    justifyContent={"left"}
                  >
                    <Box w="200px" justifyContent={"left"}>
                      <Text
                        align={"left"}
                        size={"4em"}
                        fontSize={"14px"}
                        fontWeight={"bold"}
                      >
                        {event.eventTitle}
                      </Text>
                      <Text align={"left"}>Where: {event.eventLocation}</Text>
                      <Text align={"left"}>Date: {event.date}</Text>
                      <Text align={"left"}>Time: {event.time}</Text>
                    </Box>
                  </Flex>
                </Grid>
              )}

              {/* {matches.small && (
              <Grid
                templateAreas={`"nav button"
                  "title time"
                  "event event"`}
                gridTemplateRows={"1fr 1fr 3fr"}
                gridTemplateColumns={"1fr 1fr"}
                h="300px"
                gap="1"
                color="blackAlpha.700"
                justifyContent="center"
                alignItems="center"
              >
                <GridItem pl="1" area={"title"} color="black">
                  <Flex ml="1em">{event.eventTitle}</Flex>
                </GridItem>
                <GridItem area={"nav"} color="black">
                  <Flex mb="0.5em" ml="2.5em" mt="1em">
                    {status == "error"
                      ? "User Not Exist"
                      : status == "loading"
                      ? "loading user information"
                      : data.fullName}
                  </Flex>
                  <Flex mx="2em">
                    <Image
                      src={
                        status == "error"
                          ? "User Not Exist"
                          : status == "loading"
                          ? "loading user information"
                          : data.profilePhotoUrl
                      }
                      alignSelf={"center"}
                      alt={`Picture of ${
                        status == "error"
                          ? "User Not Exist"
                          : status == "loading"
                          ? "loading user information"
                          : data.fullName
                      }`}
                      rounded="85px"
                      width="4em"
                      height="4em"
                      boxShadow={
                        "0px 1px 18px -5px rgb(0 0 0 / 57%), 0 10px 10px -5px rgb(0 0 0 / 45%)"
                      }
                      mb="1em"
                    />
                  </Flex>
                </GridItem>
                <GridItem pl="1" area={"event"} color="black">
                  <Flex ml="1em" flexDirection="column">
                    <Flex>{event.eventDescription} </Flex>
                    <Flex>Where: {event.eventLocation}</Flex>
                    <Flex>
                      When: {event.date} {event.time}
                    </Flex>
                  </Flex>
                </GridItem>
                <GridItem pl="1" area={"button"} color="black">
                  <Stack direction="column" spacing={3} justify="center">
                    <Flex justify={"center"}>
                      <Button
                        colorScheme="milk"
                        size="md"
                        variant="outline"
                        leftIcon={<AddIcon />}
                      >
                        Apply Event
                      </Button>
                    </Flex>
                    <Flex justify={"center"}>
                      <Button
                        colorScheme="milk"
                        size="md"
                        variant="outline"
                        leftIcon={<CheckCircleIcon />}
                      >
                        Accept Invite
                      </Button>
                    </Flex>
                  </Stack>
                </GridItem>
                <GridItem pl="1" area={"time"} color="black">
                  <Flex justifyContent="center">{event.time}</Flex>
                </GridItem>
              </Grid>
            )} */}
            </Fragment>
          )}
        </Media>
      </Link>
    </Box>
  );
}

export default EventNotification;
