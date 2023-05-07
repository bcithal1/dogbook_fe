import Carousel from "@/components/Carousel";
import Navbar from "@/components/Navbar";
import VideoCard from "@/components/VideoCard";
import { Button, Center, ChakraProvider, Flex, Image } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React from "react";

function home() {
  const router = useRouter();

  const handleChange = () => {
    router.push({ pathname: `/user-profile`, query: { myParam: "6" } });
  };

  return (
    <>
      <Button onClick={handleChange}>Press Me!</Button>
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
