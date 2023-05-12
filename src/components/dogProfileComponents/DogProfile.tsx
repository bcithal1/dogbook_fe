import { useGetDogProfileByDogId } from "@/queries/dog.queries";
import { Container, Spinner } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import AboutDog from "./AboutDog";
import DogOverView from "./DogOverview";
import DogShortcutBar from "./DogShortcutBar";
import DogSideBar from "./DogSideBar";
import Loader from "../CustomComponents/Loader";

function DogPage({ dogId }: { dogId: number }) {
  const { data: session } = useSession();
  const { isLoading, data: dogProfile } = useGetDogProfileByDogId(
    session?.accessToken,
    dogId
  );

  if (isLoading) {
    return <Loader />;
  }
  console.log(dogProfile);
  return (
    <>
      <Container maxW="container.xl" backgroundColor={"#F5F2EA"} rounded={"lg"}>
        <DogOverView
          dogProfile={dogProfile}
          accessToken={session.accessToken}
        />
        <DogShortcutBar dogProfile={dogProfile} />
        <DogSideBar dogProfile={dogProfile} session={session} />
      </Container>
    </>
  );
}

export default DogPage;
