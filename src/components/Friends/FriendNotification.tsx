import { useGetFriendList } from "@/queries/friend.queries";
import { Container } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import Loader from "../CustomComponents/Loader";
import { useRouter } from "next/router";
import { FriendButton } from "./FriendButton";
import { FriendCard } from "./FriendPage";

function FriendNotification({ userId }: { userId: number }) {
  const { data: session } = useSession();
  const router = useRouter();

  const { isLoading: friendListIsLoading, data: friendList } = useGetFriendList(
    session?.accessToken,
    session?.user.id
  );

  if (friendListIsLoading) {
    return <Loader />;
  }
  return <>{/* <FriendCard /> */}</>;
}

export default FriendNotification;
