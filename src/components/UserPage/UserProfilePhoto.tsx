import { Avatar } from "@chakra-ui/react";

export const UserProfilePhotoSmall = () => {
  return (
    <Avatar
      size={"lg"}
      src={"/Assets/LargeDogs/avatar-blake.png"}
      title="Ziggy"
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

export const UserProfilePhoto = () => {
  return (
    <Avatar
      size={"2xl"}
      src={"/Assets/LargeDogs/avatar-blake.png"}
      title="Ziggy"
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
