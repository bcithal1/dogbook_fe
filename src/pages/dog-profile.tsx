import { Container, Flex, Text, VStack } from "@chakra-ui/react";
import React from "react";
import DogProfileCarousel from "@/components/DogProfileCarousel";
import Navbar from "@/components/Navbar";
import { Dog } from "@/types/dog";
import { useRouter } from "next/router";
import ProfileSummaryBar from "@/components/dogProfileComponents/ProfileSummaryBar";
import { useGetDogById } from "@/queries/dog.queries";
import { useSession } from "next-auth/react";
import About from "@/components/dogProfileComponents/AboutDog";
import AboutDog from "@/components/dogProfileComponents/AboutDog";
import AboutParent from "@/components/dogProfileComponents/AboutParent";

function dogProfile() {
  const { query } = useRouter();
  const { data: session } = useSession();

  if (query.myParam !== undefined) {
    const id = query.myParam as unknown as number;
    const { data: dog, isSuccess } = useGetDogById(session?.accessToken, id);

    if (isSuccess) {
      console.log(dog);

      return (
        <>
          <Navbar />
          <Container maxW={"container.xl"}>
            <Flex
              h={{ base: "auto", md: "100vh" }}
              py={10}
              px={5}
              direction={{ base: "column", md: "row" }}
            >
              <VStack spacing={2} alignItems={"flex-start"}>
                <ProfileSummaryBar dog={dog} />
                <AboutDog dog={dog} />
                <AboutParent />
              </VStack>
              <VStack
                w={"full"}
                h={"full"}
                p={10}
                spacing={10}
                alignItems="flex-start"
                bg={"gray.50"}
              >
                <Text>THIS IS WHERE THE FEED WILL GO</Text>
              </VStack>
            </Flex>
          </Container>
        </>
      );
    }
  }
}
export default dogProfile;
