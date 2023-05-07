import { useGetDogByOwnerId } from "@/queries/dog.queries";
import { useGetFriendList } from "@/queries/friend.queries";
import { useGetUserInfo } from "@/queries/user.queries";
import { Button, Container, Spinner } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { FriendPage } from "../Friends/FriendPage";
import UserOverView from "./UserOverview";
import UserShortcutBar from "./UserShortcutBar";
import UserSideBar from "./UserSideBar";
import { useRouter } from "next/router";

function UserPage({ userId }: { userId: string }) {
  const { data: session } = useSession();
  const router = useRouter();

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

  const handleChange = () => {
    router.push({ pathname: `/user-profile`, query: { myParam: "2" } });
  };

  if (
    dogStatus === "loading" ||
    userStatus === "loading" ||
    friendStatus === "loading"
  ) {
    return <Spinner></Spinner>;
  }
  return (
    <>
      <Button onClick={handleChange}>Press Me!</Button>
      <Container maxW="container.xl" backgroundColor={"#F5F2EA"} rounded={"lg"}>
        <UserOverView
          user={userData}
          dogList={dogList}
          friendList={friendList}
        />
        <UserShortcutBar user={userData} />
        <UserSideBar user={userData} dogList={dogList} />
        <FriendPage friendList={friendList} />
      </Container>
    </>
  );
}

export default UserPage;
