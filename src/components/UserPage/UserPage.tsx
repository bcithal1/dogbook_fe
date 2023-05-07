import { useGetDogByOwnerId } from "@/queries/dog.queries";
import { useGetFriendList } from "@/queries/friend.queries";
import { useGetUserInfo, useGetUserProfile } from "@/queries/user.queries";
import { Button, Container } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { FriendPage } from "../Friends/FriendPage";
import UserOverView from "./UserOverview";
import UserShortcutBar from "./UserShortcutBar";
import UserSideBar from "./UserSideBar";
import Loader from "../CustomComponents/Loader";
import { useRouter } from "next/router";

function UserPage({ userId }: { userId: string }) {
  const { data: session } = useSession();
  const router = useRouter();

  const { isLoading: userIsLoading, data: userData } = useGetUserInfo(
    session?.accessToken,
    userId
  );

  const { isLoading: dogListIsLoading, data: dogList } = useGetDogByOwnerId(
    session?.accessToken,
    userId
  );

  const { isLoading: friendListIsLoading, data: friendList } = useGetFriendList(
    session?.accessToken,
    userId
  );

  const { isLoading: profileIsLoading, data: userProfile } = useGetUserProfile(
    session?.accessToken,
    userId
  );

  const handleChange = () => {
    router.push({ pathname: `/user-profile`, query: { myParam: "2" } });
  };

  if (
    dogListIsLoading ||
    userIsLoading ||
    profileIsLoading ||
    friendListIsLoading
  ) {
    return <Loader />;
  }
  return (
    <>
      <Container maxW="container.xl" backgroundColor={"#F5F2EA"} rounded={"lg"}>
        <UserOverView
          user={userData}
          dogList={dogList}
          friendList={friendList}
          profilePicture={userProfile}
        />
        <UserShortcutBar user={userData} />
        <UserSideBar
          user={userData}
          dogList={dogList}
          userProfile={userProfile}
        />
        <FriendPage friendList={friendList} />
      </Container>
    </>
  );
}

export default UserPage;
