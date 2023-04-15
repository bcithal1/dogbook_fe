import {
  Container,
  Flex,
  Heading,
  VStack,
  Text,
  SimpleGrid,
  FormControl,
  FormLabel,
  Input,
  GridItem,
  Button,
  useBreakpointValue,
} from "@chakra-ui/react";
import UserBio from "./UserBio";
import UserPets from "./UserPets";

function UserSideBar() {
  const colSpan = useBreakpointValue({ base: "full", md: "75%" });

  return (
    <>
      <Flex
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
          <UserPets />
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
