import { useGetDogProfileByDogIdv2 } from "@/queries/dog.queries";
import { Dog } from "@/types/dog";
import { Avatar, Box, Spinner } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import React from "react";
import DogProfilePhotoForEvent from "./DogProfilePhotoForEvent";

function DogProfileInEvent({ dog }: { dog: Dog }) {
  const { data: session } = useSession();
  const { dogProfileStatus, dogProfile } = useGetDogProfileByDogIdv2(
    session?.accessToken,
    dog.id
  );

  if (dogProfileStatus === "loading") return <Spinner color='red.500' />;
  if (dogProfileStatus === "error")
    return (
      <Avatar
        size={"md"}
        src={``}
        title={dog.name}
        css={{
          border: "5px solid #886E58",
          marginTop: "5px",
        }}
        boxShadow={
          "0px 1px 18px -5px rgb(0 0 0 / 57%), 0 10px 10px -5px rgb(0 0 0 / 45%)"
        }
      />
    );

  return (
    <Box>
      <DogProfilePhotoForEvent
        dogProfile={dogProfile}
        accessToken={session?.accessToken}
      />
    </Box>
  );
}

export default DogProfileInEvent;
