import React from "react";
import { Box, Text, Flex, ChakraProvider, Center } from "@chakra-ui/react";
import EventList2 from "@/components/event/EventList2";

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
                Friend Requests
              </Text>
            </Center>
            <Box h="400px" borderBottom="1px" width="100%">
              {/* import friend requests here */}
              <Text fontSize={"sm"}>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged. It was
                popularised in the 1960s with the release of Letraset sheets
                containing Lorem Ipsum passages, and more recently with desktop
                publishing software like Aldus PageMaker including versions of
                Lorem Ipsum.
              </Text>
            </Box>
          </Box>
        </Flex>
      </Flex>
    </ChakraProvider>
  );
}
