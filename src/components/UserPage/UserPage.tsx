import { useGetDogByOwnerId } from "@/queries/dog.queries";
import { useGetUserInfo } from "@/queries/user.queries";
import { User } from "@/types/user";
import { Container, Spinner } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import UserOverView from "./UserOverview";
import UserShortcutBar from "./UserShortcutBar";
import UserSideBar from "./UserSideBar";

function UserPage() {
  const { data: session } = useSession();
  const { status: userStatus, data: userData } = useGetUserInfo(
    session?.accessToken,
    "1"
  );
  if (userStatus === "loading") {
    return <Spinner></Spinner>;
  }

  const { status: dogStatus, data: userDogs } = useGetDogByOwnerId(
    session?.accessToken,
    userData.id
  );
  if (dogStatus === "loading") {
    return <Spinner></Spinner>;
  }

  const props = {
    user: userData,
    dogList: userDogs,
  };

  return (
    <>
      <Container maxW="container.xl" backgroundColor={"#F5F2EA"} rounded={"lg"}>
        <UserOverView user={userData} dogList={userDogs} />
        <UserShortcutBar user={userData} />
        <UserSideBar {...props} />
      </Container>
    </>
  );
}

export default UserPage;
