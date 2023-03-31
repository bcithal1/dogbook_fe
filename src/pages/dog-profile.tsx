import { Avatar, Box, ChakraProvider, Flex, Text } from "@chakra-ui/react";
import React from "react";
import DogProfileCarousel from "@/components/DogProfileCarousel";
import Navbar from "@/components/Navbar";

function dogProfile() {
  return (
    <div>
      <ChakraProvider>
        <Flex
          display={"column"}
          maxBlockSize={"600px"}
          alignItems="center"
          justifyContent="center"
        >
          <Navbar />

          <Flex justify={"center"} mt={12} mb={3}>
            <Avatar
              size={{ base: "153px", md: "174px", lg: "200px" }}
              src={"/Assets/LargeDogs/avatar-blake.png"}
              title={"Blake"}
              css={{
                border: "9px solid #886E58",
              }}
              boxShadow={
                "0px 1px 18px -5px rgb(0 0 0 / 57%), 0 10px 10px -5px rgb(0 0 0 / 45%)"
              }
            />
          </Flex>

          <Text textAlign={"center"} fontSize={"3xl"}>
            Hello, my name is Blake
          </Text>

          <Flex alignItems="center" justifyContent="center">
            <Box
              mt={"21px"}
              mb={"21px"}
              pt={"42px"}
              pb={"42px"}
              bg={"#886E58"}
              maxW="650px"
              maxH={"300px"}
              rounded="18px"
              boxShadow={
                "0px 1px 18px -5px rgb(0 0 0 / 57%), 0 10px 10px -5px rgb(0 0 0 / 45%)"
              }
            >
              <Text
                textAlign={"left"}
                fontSize={"1xl"}
                color={"white"}
                ml={"21px"}
                mr={"21px"}
              >
                Bio: My name is Blake and my mom is Anika
              </Text>
              <Text
                textAlign={"left"}
                fontSize={"1xl"}
                color={"white"}
                ml={"21px"}
                mr={"21px"}
              >
                Looking for: Friends to play and cuddle with
              </Text>
            </Box>
          </Flex>

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
