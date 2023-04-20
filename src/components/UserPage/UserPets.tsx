import { useGetDogByOwnerId, useGetDogPhoto } from "@/queries/dog.queries";
import { User } from "@/types/user";
import { Heading, SimpleGrid, GridItem, Flex, Spinner } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { PuppyCardSmall } from "../DogCard";

function UserPets({ user }: { user: User }) {
  const { data: session } = useSession();
  const { status, data } = useGetDogByOwnerId(session?.accessToken, user.id);

  if (status === "loading") {
    return <Spinner></Spinner>;
  }

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

        {data.map((dog) => (
          <GridItem colSpan={1} margin={"auto"}>
            <Flex>
              <PuppyCardSmall dog={dog} />
            </Flex>
          </GridItem>
        ))}
      </SimpleGrid>
    </>
  );
}

export default UserPets;
