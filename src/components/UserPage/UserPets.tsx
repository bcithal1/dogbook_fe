import { useGetDogByOwnerId } from "@/queries/dog.queries";
import { Dog } from "@/types/dog";
import { User } from "@/types/user";
import { Heading, SimpleGrid, GridItem, Flex} from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { DogAvatarSmall } from "../DogCard";
import Loader from "../Loader";

function UserPets({ user }: { user: User }, { dog }: { dog: Array<Dog> }) {
  const { data: session } = useSession();
  const { status, data } = useGetDogByOwnerId(session?.accessToken, user.id);

  if (status === "loading") {
    return <Loader />;
  }

  const hasDog: boolean = dog.length != 0;

  return (
    <>
      <SimpleGrid
        columns={2}
        w={"full"}
        borderWidth="2px"
        borderColor={"blackAlpha.600"}
        rounded="5px"
        shadow="lg"
        alignContent={"center"}
        py={2}
        spacingY={5}
      >
        <GridItem colSpan={2}>
          <Heading size={"l"} pl={"2"}>
            {user.fullName}'s Pets
          </Heading>
        </GridItem>

        {hasDog ? (
          data.map((dog) => (
            <GridItem colSpan={1} margin={"auto"}>
              <Flex>
                <DogAvatarSmall dog={dog} />
              </Flex>
            </GridItem>
          ))
        ) : (
          <div>NO DOGS FOUND</div>
        )}
      </SimpleGrid>
    </>
  );
}

export default UserPets;
