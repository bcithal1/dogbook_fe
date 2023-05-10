import Carousel from "@/components/Carousel";
import Navbar from "@/components/Navbar";
import VideoCard from "@/components/VideoCard";
import { Center, ChakraProvider, Flex, Image } from "@chakra-ui/react";
import React from "react";
import TimelinePost from '@/components/TimelinePost';

function home() {
  return (
    <>
      <TimelinePost />
      <br />
      <Center>
        <Flex maxWidth={"500px"}></Flex>
      </Center>
      <VideoCard />
    </>
  );
}

export default home;
