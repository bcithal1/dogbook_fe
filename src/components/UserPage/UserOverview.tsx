import { Dog } from "@/types/dog";

import {
  Flex,
  VStack,
  Text,
  SimpleGrid,
  GridItem,
  useBreakpointValue,
  Heading,
  Box,
} from "@chakra-ui/react";
import { DogAvatarSmall } from "../DogCard";
import { UserProfilePhoto } from "./UserProfilePhoto";
import { useSession } from "next-auth/react";
import { User, UserProfile } from "@/types/user";
import { Friendship } from "@/types/friendship";
import { FriendButton, FriendButtonSmall } from "../Friends/FriendButton";

type UserSideBarProps = {
  user: User;
  dogList: Dog[];
  friendList: Friendship[];
  userProfile: UserProfile;
};

const UserOverView: React.FC<UserSideBarProps> = ({
  user,
  dogList,
  friendList,
  userProfile,
}) => {
  const { data: session } = useSession();
  const buttonSpacer = useBreakpointValue({ base: 1, md: "60px" });

  let friend: string;
  friendList.length == 1 ? (friend = "Friend") : (friend = "Friends");

  let dog: string;
  dogList.length == 1 ? (dog = "Dog") : (dog = "Dogs");

  return (
    <>
      <Flex h={{ base: "auto" }} py={5}>
        <UserProfilePhoto photoId={userProfile.profilePhotoId} />
        <VStack>
          <SimpleGrid
            id="userData"
            columns={1}
            columnGap={3}
            rowGap={2}
            w={"full"}
            pl={3}
          >
            <GridItem colSpan={1}>
              <Heading>{user.fullName}</Heading>
            </GridItem>
            <GridItem colSpan={1}>
              <Text>
                {friendList.length} {friend} | {dogList.length} {dog}
              </Text>
            </GridItem>
            <GridItem colSpan={1} columnGap={0}>
              {dogList.map((dog: Dog, index: number) => (
                <DogAvatarSmall key={index} dog={dog} />
              ))}
            </GridItem>
          </SimpleGrid>
        </VStack>
        <Box ml={"auto"}>
          <FriendButtonSmall friends={friendList} />
        </Box>
      </Flex>
    </>
  );
};

export default UserOverView;
