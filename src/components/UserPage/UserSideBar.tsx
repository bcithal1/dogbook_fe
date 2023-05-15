import {
  Flex,
  VStack,
  Text,
  useBreakpointValue,
  Box,
  Heading,
} from "@chakra-ui/react";
import UserPets from "./UserPets";
import PostForm from "../PostForm";
import { User, UserProfile } from "@/types/user";
import { Dog } from "@/types/dog";
import UserTimeline from "./UserTimeline";

type UserSideBarProps = {
  user: User;
  dogList: Dog[];
  userProfile: UserProfile;
};

const UserSideBar: React.FC<UserSideBarProps> = ({
  user,
  dogList,
  userProfile,
}) => {
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
          <Box
            borderWidth="2px"
            borderColor={"blackAlpha.600"}
            rounded="5px"
            shadow="lg"
            w={"full"}
          >
            <Heading size={"l"} px={2} pt={1}>
              About
            </Heading>
            <Text pb={3} align={"center"}>
              {userProfile.aboutSection}
            </Text>
          </Box>
          <UserPets user={user} dogList={dogList} />
        </VStack>
        <VStack
          w={"full"}
          h={"full"}
          p={10}
          spacing={10}
          alignItems="flex-start"
          bg={"gray.50"}
        >
          <PostForm />
          {/* <UserTimeline user={user} /> */}
        </VStack>
      </Flex>
    </>
  );
};

export default UserSideBar;
