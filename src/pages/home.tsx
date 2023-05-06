import Carousel from "@/components/Carousel";
import Navbar from "@/components/Navbar";
import VideoCard from "@/components/VideoCard";
import { Center, ChakraProvider, Flex, Image } from "@chakra-ui/react";
import React from "react";

function home() {
  return (
    <>
      <Navbar />
      <br />
      <Center>
        <Flex maxWidth={"500px"}></Flex>
      </Center>
      <VideoCard />
    </>
  );
}

export default home;
