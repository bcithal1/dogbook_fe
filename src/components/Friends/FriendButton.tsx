import Navbar from "@/components/Navbar";
import UserPage from "@/components/UserPage/UserPage";
import { Friendship } from "@/types/friendship";
import { Button } from "@chakra-ui/react";
import { useSession } from "next-auth/react";

const handleClick = () => {};

export const FriendButton = () => {
  const { data: session } = useSession();

  return <Button onClick={handleClick}>Button</Button>;

  return <></>;
};

export const FriendCardFriendButton = ({
  friendList,
}: {
  friendList: Friendship[];
}) => {
  const { data: session } = useSession();
  // session?.user.id

  friendList.forEach((friend) => {
    if (friend.secondaryUserId == session.user.id) {
      return <Button onClick={handleClick}>Rm Friend</Button>;
    }
  });

  return <Button onClick={handleClick}>Button</Button>;

  return <></>;
};
