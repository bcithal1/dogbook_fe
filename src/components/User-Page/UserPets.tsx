import { Heading, SimpleGrid, GridItem, Flex } from "@chakra-ui/react";
import { PuppyCardSmall } from "../DogCard";

function UserPets() {
  return (
    <>
      <SimpleGrid
        columns={2}
        w={"full"}
        borderWidth="2px"
        borderColor={"blackAlpha.600"}
        rounded="5px"
        shadow="lg"
        alignContent={"center"}
        py={2}
        spacingY={5}
      >
        <GridItem colSpan={2}>
          <Heading size={"l"} pl={"2"}>
            User Name's Pets
          </Heading>
        </GridItem>
        <GridItem colSpan={1} margin={"auto"}>
          <Flex>
            <PuppyCardSmall />
          </Flex>
        </GridItem>
        <GridItem colSpan={1} margin={"auto"}>
          <Flex>
            <PuppyCardSmall />
          </Flex>
        </GridItem>
        <GridItem colSpan={1} margin={"auto"}>
          <Flex>
            <PuppyCardSmall />
          </Flex>
        </GridItem>
        <GridItem colSpan={1} margin={"auto"}>
          <Flex>
            <PuppyCardSmall />
          </Flex>
        </GridItem>
      </SimpleGrid>
    </>
  );
}

export default UserPets;
