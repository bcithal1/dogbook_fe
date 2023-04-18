import React, { Fragment } from "react";
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
  Button,
  Stack,
} from "@chakra-ui/react";
import { Event } from "@/types/event";
import { AddIcon, CheckCircleIcon, StarIcon } from "@chakra-ui/icons";
import { useSession } from "next-auth/react";
import { getUserById } from "@/queries/user.queries";
import Media from "react-media";
import { userAcceptEventInvite, userApplyToUninvitedEvent } from "@/queries/event.querues";

function EventCard({ event }: { event: Event }) {
  const { data: session } = useSession();
  const { status, data } = getUserById(session?.accessToken, event.hostId);
  const userAcceptInvite =  userAcceptEventInvite(session?.accessToken);
  const userApplyForEvent = userApplyToUninvitedEvent(session?.accessToken);

  function onAccept(){
      userAcceptInvite.mutate(event.eventId)
  }

  function onApply(){
      userApplyForEvent.mutate(event.eventId)
  }


  return (
    <Box
      w="69%"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      bg={"#886E58"}
      mb="5"
      fontFamily={"font-family: Arial, sans-serif;"}
    >
      <Media
        queries={{ small: "(max-width:700px)", medium: "(min-width:700px)" }}
      >
        {(matches) => (
          <Fragment>
            {matches.medium && (
              <Grid
                templateAreas={`"nav header time"
                  "nav main footer"
                  "nav main footer"`}
                gridTemplateRows={"ifr 2fr"}
                gridTemplateColumns={"1fr 5fr 3fr"}
                h="200px"
                gap="1"
                color="blackAlpha.700"
                fontWeight="bold"
                justifyContent="center"
                alignItems="center"
              >
                <GridItem pl="2" area={"header"} color="white">
                  <Flex ml="3em">{event.eventTitle}</Flex>
                </GridItem>
                <GridItem pl="2em" area={"nav"} color="white">
                  <Flex mx="1em">
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
                    />
                  </Flex>
                </GridItem>
                <GridItem pl="2" area={"main"} color="white">
                  <Flex ml="3em" flexDirection="column">
                    <Flex>{event.eventDescription} </Flex>
                    <Flex>Where: {event.eventLocation}</Flex>
                    <Flex>
                      When: {event.date} {event.time}
                    </Flex>
                  </Flex>
                </GridItem>
                <GridItem pl="2" area={"footer"} color="white">
                  <Stack direction="column" spacing={3} justify="center">
                    <Flex justify={"center"}>
                      <Button
                        colorScheme="milk"
                        size="md"
                        variant="outline"
                        leftIcon={<AddIcon />}
                        onClick={onApply}
                      >
                        Apply
                      </Button>
                    </Flex>
                    <Flex justify={"center"}>
                      <Button
                        colorScheme="milk"
                        size="md"
                        variant="outline"
                        leftIcon={<CheckCircleIcon />}
                        onClick = {onAccept}
                      >
                        Accept
                      </Button>
                    </Flex>
                  </Stack>
                </GridItem>
                <GridItem pl="2" area={"time"} color="white">
                  <Flex justifyContent="center">{event.time}</Flex>
                </GridItem>
              </Grid>
            )}

            {matches.small && (
              <Grid
                templateAreas={`"nav button"
                  "title time"
                  "event event"`}
                gridTemplateRows={"1fr 1fr 3fr"}
                gridTemplateColumns={"1fr 1fr"}
                h="300px"
                gap="1"
                color="blackAlpha.700"
                fontWeight="bold"
                justifyContent="center"
                alignItems="center"
              >
                <GridItem pl="1" area={"title"} color="white">
                  <Flex ml="1em">{event.eventTitle}</Flex>
                </GridItem>
                <GridItem pl="1" area={"nav"} color="white">
                  <Flex mx="0.5em">
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
                    />
                  </Flex>
                </GridItem>
                <GridItem pl="1" area={"event"} color="white">
                  <Flex ml="1em" flexDirection="column">
                    <Flex>{event.eventDescription} </Flex>
                    <Flex>Where: {event.eventLocation}</Flex>
                    <Flex>
                      When: {event.date} {event.time}
                    </Flex>
                  </Flex>
                </GridItem>
                <GridItem pl="1" area={"button"} color="white">
                  <Stack direction="column" spacing={3} justify="center">
                    <Flex justify={"center"}>
                      <Button
                        colorScheme="milk"
                        size="md"
                        variant="outline"
                        leftIcon={<AddIcon />}
                      >
                        Apply
                      </Button>
                    </Flex>
                    <Flex justify={"center"}>
                      <Button
                        colorScheme="milk"
                        size="md"
                        variant="outline"
                        leftIcon={<CheckCircleIcon />}
                      >
                        Accept
                      </Button>
                    </Flex>
                  </Stack>
                </GridItem>
                <GridItem pl="1" area={"time"} color="white">
                  <Flex justifyContent="center">{event.time}</Flex>
                </GridItem>
              </Grid>
            )}
          </Fragment>
        )}
      </Media>
    </Box>
  );
}

export default EventCard;
