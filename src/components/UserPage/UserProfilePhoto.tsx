import {
  useGetUserPicByPicId,
  useGetUserPicByUserId,
} from "@/queries/user.queries";
import { Avatar } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import Loader from "../CustomComponents/Loader";

export const UserProfilePhotoSmall = ({ userId }: { userId: string | number }) => {
  const { data: session } = useSession();
  const { isLoading, data } = useGetUserPicByUserId(
    session?.accessToken,
    userId
  );

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Avatar
      size={"lg"}
      src={`data:image/png;base64, ${data}`}
      css={{
        border: "1px solid #886E58",
        marginTop: "5px",
      }}
      boxShadow={
        "0px 1px 18px -5px rgb(0 0 0 / 57%), 0 10px 10px -5px rgb(0 0 0 / 45%)"
      }
    />
  );
};

export const UserProfilePhoto = ({ photoId }: { photoId: string }) => {
  const { data: session } = useSession();
  const { isLoading, data } = useGetUserPicByPicId(
    session?.accessToken,
    photoId
  );

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Avatar
      size={"2xl"}
      src={`data:image/png;base64, ${data}`}
      css={{
        border: "5px solid #886E58",
        marginTop: "5px",
      }}
      boxShadow={
        "0px 1px 18px -5px rgb(0 0 0 / 57%), 0 10px 10px -5px rgb(0 0 0 / 45%)"
      }
    />
  );
};
