import { useGetDogByOwnerId } from "@/queries/dog.queries";
import { Dog } from "@/types/dog";
import { User } from "@/types/user";
import { Heading, SimpleGrid, GridItem, Flex } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { DogAvatarSmall, DogCardSmall } from "../DogCard";
import Loader from "../CustomComponents/Loader";

type UserPetsProps = {
  user: User;
  dogList: Dog[];
};

const UserPets: React.FC<UserPetsProps> = ({ user, dogList }) => {
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
        <GridItem colSpan={1} columnGap={0}>
          {dogList.map((dog: Dog, index: number) => (
            <DogCardSmall key={index} dog={dog} />
          ))}
        </GridItem>
      </SimpleGrid>
    </>
  );
};

export default UserPets;
