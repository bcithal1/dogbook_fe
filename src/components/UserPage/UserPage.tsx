import { useGetDogByOwnerId } from "@/queries/dog.queries";
import {
  useGetFriendList,
  useGetReceivedFriendRequests,
  useGetSentFriendRequests,
} from "@/queries/friend.queries";
import { useGetUserInfo } from "@/queries/user.queries";
import { User } from "@/types/user";
import { Button, Container, Spinner } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { FriendPage } from "../Friends/FriendPage";
import UserOverView from "./UserOverview";
import UserShortcutBar from "./UserShortcutBar";
import UserSideBar from "./UserSideBar";

function UserPage() {
  const { data: session } = useSession();

  const userId = "1";

  const { status: userStatus, data: userData } = useGetUserInfo(
    session?.accessToken,
    userId
  );

  const { status: dogStatus, data: dogList } = useGetDogByOwnerId(
    session?.accessToken,
    userId
  );

  const { status: friendStatus, data: friendList } = useGetFriendList(
    session?.accessToken,
    userId
  );

  if (
    dogStatus === "loading" ||
    userStatus === "loading" ||
    friendStatus === "loading"
  ) {
    return <Spinner></Spinner>;
  }
  return (
    <>
      <Container maxW="container.xl" backgroundColor={"#F5F2EA"} rounded={"lg"}>
        <Button onClick={() => useGetFriendList(session?.accessToken, "1")}>
          Button
        </Button>
        <UserOverView
          user={userData}
          dogList={dogList}
          friendList={friendList}
        />
        <UserShortcutBar user={userData} />
        {/* <UserSideBar user={userData} dogList={dogList} /> */}
        <FriendPage friendList={friendList} />
      </Container>
    </>
  );
}

export default UserPage;
