import { Dog } from "@/types/dog";

import {
  Flex,
  VStack,
  Text,
  SimpleGrid,
  GridItem,
  useBreakpointValue,
  Heading,
} from "@chakra-ui/react";
import { DogAvatarSmall } from "../DogCard";
import { UserProfilePhoto } from "./UserProfilePhoto";

function UserOverView(props) {
  const buttonSpacer = useBreakpointValue({ base: 1, md: "60px" });
  const dogList = props.dogList;

  return (
    <>
      <Flex
        h={{ base: "auto" }}
        py={5}
        direction={{ base: "column", md: "row" }}
      >
        <UserProfilePhoto />
        <VStack>
          <SimpleGrid columns={1} columnGap={3} rowGap={2} w={"full"} pl={3}>
            <GridItem colSpan={1}>
              <Heading>{props.user.fullName}</Heading>
            </GridItem>
            <GridItem colSpan={1}>
              <Text>
                {props.friendList.length} Friends | {props.dogList.length} Dogs
              </Text>
            </GridItem>
            <GridItem colSpan={1} columnGap={0}>
              {dogList.map((dog: Dog, index: number) => (
                <DogAvatarSmall key={index} dog={dog} />
              ))}
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
              <Text>Message</Text>
            </GridItem>
            <GridItem colSpan={1}>
              <Text>Friend</Text>
            </GridItem>
          </SimpleGrid>
        </VStack>
      </Flex>
    </>
  );
}

export default UserOverView;
