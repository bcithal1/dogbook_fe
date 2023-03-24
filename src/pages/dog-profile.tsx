import { ChakraProvider, Flex } from "@chakra-ui/react";
import React from "react";
import { Text } from "@chakra-ui/react";
import DogProfileCarousel from "@/components/DogProfileCarousel";
import Navbar from "@/components/Navbar";

function dogProfile() {
  return (
    <div>
      <ChakraProvider>
        <Flex display={"column"} justifyContent="center">
          <Navbar />
          <Text textAlign={"center"} fontSize={"4xl"}>
            this is the dog profile page
          </Text>
          <DogProfileCarousel
            card={{
              name: "",
              image: "",
              color: "",
            }}
          />
        </Flex>
      </ChakraProvider>
    </div>
  );
}

export default dogProfile;
