import Carousel from "@/components/Carousel";
import Navbar from "@/components/Navbar";
import VideoCard from "@/components/VideoCard";
import { Center, ChakraProvider, Flex, Image } from "@chakra-ui/react";
import React from "react";

function home() {
  return (
    <ChakraProvider>
      <Navbar />
      <br />
      <Carousel
        card={{
          name: "",
          image: "",
          bio: "",
          color: "",
          href: "",
        }}
      />
      <Center>
        <Flex maxWidth={"500px"}>
          <Image src="/Assets/Rectanglemap.png" title="just a mock-up"></Image>
        </Flex>
      </Center>
      <VideoCard />
    </ChakraProvider>
  );
}

export default home;
