import {
  Heading,
  SimpleGrid,
  GridItem,
  Flex,
  Container,
} from "@chakra-ui/react";
import { PuppyCardSmall } from "../DogCard";
import UserOverView from "./UserOverview";
import UserShortcutBar from "./UserShortcutBar";
import UserSideBar from "./UserSideBar";

function UserPage() {
  return (
    <>
      <Container maxW="container.xl" backgroundColor={"#F5F2EA"} rounded={"lg"}>
        <UserOverView />
        <UserShortcutBar />
        <UserSideBar />
      </Container>
    </>
  );
}

export default UserPage;
