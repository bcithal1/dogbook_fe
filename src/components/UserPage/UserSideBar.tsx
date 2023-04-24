import { Dog } from "@/types/dog";
import { User } from "@/types/user";
import { Flex, VStack, Text, useBreakpointValue } from "@chakra-ui/react";
import UserBio from "./UserBio";
import UserPets from "./UserPets";

function UserSideBar(props) {
  const colSpan = useBreakpointValue({ base: "full", md: "75%" });
  return (
    <>
      <Flex
        id="flexBox"
        h={{ base: "auto", md: "100vh" }}
        py={5}
        direction={{ base: "column", md: "row" }}
      >
        <VStack
          w={colSpan}
          h={"full"}
          spacing={4}
          px={4}
          alignItems="flex-start"
        >
          <UserBio />
          {/* <UserPets /> */}
        </VStack>
        <VStack
          w={"full"}
          h={"full"}
          p={10}
          spacing={10}
          alignItems="flex-start"
          bg={"gray.50"}
        >
          <Text>THIS IS WHERE THE USER FEED WILL GO</Text>
        </VStack>
      </Flex>
    </>
  );
}

export default UserSideBar;
