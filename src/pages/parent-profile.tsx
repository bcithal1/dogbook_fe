import React from "react";
import DogCard from "@/components/DogCard";
import { ChakraProvider, Flex } from "@chakra-ui/react";
import { Text } from "@chakra-ui/react";
import Navbar from "@/components/Navbar";

function parentProfile() {
  return (
    <ChakraProvider>
      <div>
        <Flex display={"column"} justifyContent="center">
          <Navbar />

          <Text>
            this is the Parent Profile page that will dispay their dog info
          </Text>
          <DogCard />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
        </Flex>
      </div>
    </ChakraProvider>
  );
}

export default parentProfile;