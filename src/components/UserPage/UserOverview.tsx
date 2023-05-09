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
import { useSession } from "next-auth/react";
import { UserProfile } from "@/types/user";

function UserOverView(props) {
  const { data: session } = useSession();
  const buttonSpacer = useBreakpointValue({ base: 1, md: "60px" });
  const dogList: Dog[] = props.dogList;
  const userProfile: UserProfile = props.userProfile;

  let friend: string;
  props.friendList.length == 1 ? (friend = "Friend") : (friend = "Friends");

  let dog: string;
  props.dogList.length == 1 ? (dog = "Dog") : (dog = "Dogs");

  return (
    <>
      <Flex
        h={{ base: "auto" }}
        py={5}
        direction={{ base: "column", md: "row" }}
      >
        <UserProfilePhoto photoId={userProfile.profilePhotoId} />
        <VStack>
          <SimpleGrid columns={1} columnGap={3} rowGap={2} w={"full"} pl={3}>
            <GridItem colSpan={1}>
              <Heading>{props.user.fullName}</Heading>
            </GridItem>
            <GridItem colSpan={1}>
              <Text>
                {props.friendList.length} {friend} | {props.dogList.length}{" "}
                {dog}
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
