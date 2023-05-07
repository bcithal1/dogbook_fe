import { getAxiosBackend } from "@/api/api";
import { useGetDogByOwnerId } from "@/queries/dog.queries";
import { useGetFriendList } from "@/queries/friend.queries";
import { Friendship } from "@/types/friendship";
import { User } from "@/types/user";
import {
  Box,
  Button,
  Flex,
  GridItem,
  Heading,
  HStack,
  Input,
  SimpleGrid,
  Spacer,
  Text,
} from "@chakra-ui/react";
import { Spinner } from "@chakra-ui/spinner";
import { useQueries } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { UserProfilePhotoSmall } from "../UserPage/UserProfilePhoto";
import { FriendButton } from "./FriendButton";

const FriendPage = (props: any) => {
  const friendList: Friendship[] = props.friendList;
  const { data: session } = useSession();

  const [searchQuery, setSearchQuery] = useState("");

  // Map over the friendList array and create an array of query objects.
  const multiUserQuery = friendList.map((friendship) => ({
    queryKey: ["userId", friendship.secondaryUserId],
    queryFn: async () =>
      (
        await getAxiosBackend(session?.accessToken).get<User>(
          `/users/${friendship.secondaryUserId}`
        )
      ).data,
  }));

  // Run all queries in parallel
  const queryResults = useQueries({ queries: multiUserQuery });

  if (queryResults.some((result) => result.status === "loading")) {
    return <div>Loading user data...</div>;
  }

  return (
    <Box py={4}>
      <Box
        h={{ base: "auto", md: "100vh" }}
        p={5}
        pl={0}
        backgroundColor={"brown"}
        rounded={"lg"}
        borderWidth="1px"
        shadow={"xl"}
        borderColor={"blackAlpha.600"}
      >
        <Flex pb={3} pl={4}>
          <Heading size={"lg"} color={"white"}>
            Friends
          </Heading>
          <Spacer />
          <Box>
            <Input
              placeholder={"Search"}
              value={searchQuery}
              onChange={(searchBox) => setSearchQuery(searchBox.target.value)}
            />
          </Box>
        </Flex>
        <Flex>
          <Button colorScheme="gray" variant="ghost" size={"lg"}>
            All Friends
          </Button>
          <Button colorScheme="gray" variant="ghost" size={"lg"}>
            Mutual Friends
          </Button>
        </Flex>
        <Flex pl={6}>
          <SimpleGrid columns={2} w={"full"} py={2} spacingY={5} spacingX={5}>
            {queryResults
              .filter((result) =>
                result.data.fullName
                  .toLowerCase()
                  .includes(searchQuery.toLowerCase())
              )
              .map((result, index) => (
                <FriendCard
                  key={friendList[index].secondaryUserId}
                  userData={result.data}
                />
              ))}
          </SimpleGrid>
        </Flex>
      </Box>
    </Box>
  );
};

const FriendCard = ({ userData }: { userData: User }) => {
  const { data: session } = useSession();

  if (!userData) {
    return <Spinner></Spinner>;
  }

  const { status: friendStatus, data: friendList } = useGetFriendList(
    session?.accessToken,
    userData.id
  );

  const { status: dogStatus, data: dogList } = useGetDogByOwnerId(
    session?.accessToken,
    userData.id
  );

  if (friendStatus === "loading" || dogStatus === "loading") {
    return <Spinner />;
  }

  let friend: string;
  friendList.length == 1 ? (friend = "Friend") : (friend = "Friends");

  let dog: string;
  dogList.length == 1 ? (dog = "Dog") : (dog = "Dogs");

  return (
    <GridItem
      colSpan={1}
      borderWidth="2px"
      borderColor={"blackAlpha.200"}
      rounded={"lg"}
      shadow="lg"
      bgColor={"lightsteelblue"}
    >
      <Flex pb={1}>
        <HStack>
          <Box pb={1} pl={1}>
            <UserProfilePhotoSmall />
          </Box>
          <Box>
            <Heading size={"l"}>{userData.fullName}</Heading>
            <Text fontSize="xs">
              {friendList.length} {friend} | {dogList.length} {dog}{" "}
            </Text>
          </Box>
        </HStack>
        <Spacer />
        <Box alignSelf={"center"} pr={1}>
          <FriendButtonMulti friends={friendList} />
        </Box>
      </Flex>
    </GridItem>
  );
};

export { FriendPage, FriendCard };
