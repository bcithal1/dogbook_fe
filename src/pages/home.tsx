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
      <Center>
        <Flex maxWidth={"500px"}>
          <Button onClick={handleChange}>Go To Brian's Profile!</Button>
        </Flex>
      </Center>
    </>
  );
}

export default home;
