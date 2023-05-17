import React from "react";
import { Box, Text, Flex, ChakraProvider, Center } from "@chakra-ui/react";
import EventList2 from "@/components/Notifications/EventList2";
import { FriendButton } from "@/components/Friends/FriendButton";
import FriendNotification from "@/components/Notifications/FriendNotification";
import { FriendCard } from "@/components/Friends/FriendPage";

export default function notifications() {
  return (
    <ChakraProvider>
      <Flex
        display={"column"}
        maxBlockSize={"600px"}
        alignItems="center"
        justifyContent="center"
      >
        <Flex
          mt="60px"
          justify="space-evenly"
          justifyContent="center"
          wrap="wrap"
          gap="9"
        >
          <Box
            w="360px"
            overflowY="auto"
            maxHeight="450px"
            borderRadius={10}
            my={5}
            mx={[0, 5]}
            bg="#886E58"
            boxShadow={
              "0px 1px 25px -5px rgb(0 0 0 / 57%), 0 10px 10px -5px rgb(0 0 0 / 45%)"
            }
          >
            {/* event */}
            <Center mt="20px">
              <Text fontSize={"xl"} fontWeight="medium" color={"#ffffff"}>
                Events
              </Text>
            </Center>
            <Box h="400px" borderBottom="1px" width="97%">
              {/* import event list here */}
              <EventList2 />
            </Box>
          </Box>

          <Box
            w="360px"
            rounded="sm"
            borderRadius={10}
            my={5}
            mx={[0, 5]}
            overflowY="auto"
            bg="#886E58"
            boxShadow={
              "0px 1px 25px -5px rgb(0 0 0 / 57%), 0 10px 10px -5px rgb(0 0 0 / 45%)"
            }
          >
            {/* friends */}
            <Center mt="20px">
              <Text fontSize={"xl"} fontWeight="medium" color={"#ffffff"}>
                Friends
              </Text>
            </Center>
            <Box h="400px" borderBottom="1px" width="100%">
              {/* import friend requests here */}
              Friend list goes here
              <FriendNotification />
            </Box>
          </Box>
        </Flex>
      </Flex>
    </ChakraProvider>
  );
}
