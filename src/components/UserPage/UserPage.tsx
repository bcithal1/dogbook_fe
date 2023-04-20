import { useGetUserInfo } from "@/queries/user.queries";
import { User } from "@/types/user";
import { Container, Spinner } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import UserOverView from "./UserOverview";
import UserShortcutBar from "./UserShortcutBar";
import UserSideBar from "./UserSideBar";

function UserPage() {
  const { data: session } = useSession();
  const { status, data } = useGetUserInfo(session?.accessToken, "1");

  if (status === "loading") {
    return <Spinner></Spinner>;
  }

  return (
    <>
      <Container maxW="container.xl" backgroundColor={"#F5F2EA"} rounded={"lg"}>
        <UserOverView user={data} />
        <UserShortcutBar user={data} />
        <UserSideBar user={data} />
      </Container>
    </>
  );
}

export default UserPage;
