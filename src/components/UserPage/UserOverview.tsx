import { Dog } from "@/types/dog";
import { User } from "@/types/user";
import {
  Flex,
  VStack,
  Text,
  SimpleGrid,
  GridItem,
  useBreakpointValue,
} from "@chakra-ui/react";
import {
  ReactElement,
  JSXElementConstructor,
  ReactFragment,
  ReactPortal,
} from "react";
import { PuppyCardSmall } from "../DogCard";
import UserProfilePhoto from "./UserProfilePhoto";

function UserOverView(props) {
  const buttonSpacer = useBreakpointValue({ base: 1, md: "60px" });

  return (
    <>
      <Flex
        h={{ base: "auto" }}
        py={5}
        direction={{ base: "column", md: "row" }}
      >
        <UserProfilePhoto />
        <VStack>
          <SimpleGrid
            columns={5}
            columnGap={3}
            rowGap={4}
            w={"full"}
            pt={3}
            pl={3}
          >
            <GridItem colSpan={5}>
              <Text>{props.user.fullName}</Text>
            </GridItem>
            <GridItem colSpan={5}>
              <Text>Friends</Text>
            </GridItem>
            <GridItem colSpan={1}>
            {props.dogList}.map((dogs) => (
                <PuppyCardSmall dog={dogs} />
          ))
            </GridItem>
          </SimpleGrid>
        </VStack>
        <VStack marginLeft={"auto"}>
          <SimpleGrid
            columns={2}
            columnGap={3}
            rowGap={buttonSpacer}
            w={"full"}
            pt={3}
            pl={3}
          >
            <GridItem colSpan={1} hideBelow={"md"}>
              <Text>Awards go here</Text>
            </GridItem>
            <GridItem colSpan={1} hideBelow={"md"}>
              <Text>Trophies Go here</Text>
            </GridItem>
            <GridItem colSpan={1}>
              <Text>Message Button Goes Here</Text>
            </GridItem>
            <GridItem colSpan={1}>
              <Text>Dynamic Friend Button Goes here</Text>
            </GridItem>
          </SimpleGrid>
        </VStack>
      </Flex>
    </>
  );
}

export default UserOverView;
