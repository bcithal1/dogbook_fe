import Navbar from "@/components/Navbar";
import UserPage from "@/components/UserPage/UserPage";
import { Button } from "@chakra-ui/react";
import { useSession } from "next-auth/react";

const handleClick = () => {};

export const FriendButton = () => {
  const { data: session } = useSession();

  return <Button onClick={handleClick}>Button</Button>;

  return <></>;
};

export const FriendCardFriendButton = () => {
  const { data: session } = useSession();

  return <Button onClick={handleClick}>Button</Button>;

  return <></>;
};
