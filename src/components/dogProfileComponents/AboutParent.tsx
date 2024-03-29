import { useGetDogOwnersByDogId } from "@/queries/dog.queries";
import { useGetUserById } from "@/queries/user.queries";
import { DogProfile } from "@/types/dog-profile";
import {
  Avatar,
  Box,
  Heading,
  HStack,
  Spinner,
  Stack,
  Text,
} from "@chakra-ui/react";
import { color } from "framer-motion";
import { Session } from "next-auth";
import Link from "next/link";
import router from "next/router";
import { userInfo } from "os";

function AboutParent({
  dogProfile,
  accessToken,
  dogOwnerId,
}: {
  dogProfile: DogProfile;
  accessToken: string;
  dogOwnerId: number;
}) {
  const { status, data: userInfo } = useGetUserById(accessToken, dogOwnerId);

  function handleClick() {
    router.push({
      pathname: `/user-profile`,
      query: { myParam: JSON.stringify(userInfo.id) },
    });
  }

  if (status === "loading") {
    return <Spinner />;
  }

  if (status === "success") {
    return (
      <>
        <Box
          pt={"20px"}
          pb={"20px"}
          pl={"20px"}
          rounded="10px"
          w={"full"}
          css={{
            border: "1px solid #886E58",
            backgroundColor: "white",
          }}
          boxShadow={
            "0px 1px 10px -5px rgb(0 0 0 / 57%), 0 10px 10px -5px rgb(0 0 0 / 45%)"
          }
        >
          <Stack>
            <Heading color={"#886E58"} fontSize={"xl"}>
              Owner information
            </Heading>
            <HStack spacing={"4"} marginLeft={"10px"}>
              <Avatar
                size={"lg"}
                src={""}
                title="Ziggy"
                css={{
                  border: "3px solid #886E58",
                  marginTop: "5px",
                }}
                boxShadow={
                  "0px 1px 10px -5px rgb(0 0 0 / 57%), 0 10px 10px -5px rgb(0 0 0 / 45%)"
                }
              />
              <Text>{userInfo.displayName}</Text>
            </HStack>
            <Heading
              onClick={handleClick}
              color={"#4A5568"}
              fontSize={"medium"}
            >
              See profile
            </Heading>
          </Stack>
        </Box>
      </>
    );
  }
}

export default AboutParent;
