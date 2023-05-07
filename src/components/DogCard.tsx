import { useGetDogPhoto, useGetDogProfilePhoto } from "@/queries/dog.queries";
import { Dog } from "@/types/dog";
import {
  Flex,
  Box,
  Image,
  Text,
  PopoverTrigger,
  Spinner,
  AspectRatio,
  Avatar,
  Popover,
  PopoverContent,
  PopoverHeader,
  PopoverCloseButton,
  PopoverArrow,
  PopoverBody,
  Grid,
  GridItem,
  Button,
  HStack,
} from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import CustomAvatar from "./CustomComponents/Avatar";
import { BsGenderFemale, BsGenderMale, BsDot } from "react-icons/bs";

function DogAvatarSmall({ dog }: { dog: Dog }) {
  const { data: session } = useSession();
  const { isLoading, data } = useGetDogProfilePhoto(
    session?.accessToken,
    dog.id
  );

  if (isLoading) {
    return <Spinner></Spinner>;
  }

  const genderIcon =
    dog.sex == "MALE" ? (
      <BsGenderMale color="blue" size={"28px"} />
    ) : (
      <BsGenderFemale color="pink" size={"28px"} />
    );

  const alteredStatus =
    dog.sex == "MALE" ? (
      dog.altered ? (
        <Text>Neutered</Text>
      ) : (
        <Text>Not Neutered</Text>
      )
    ) : dog.altered ? (
      <Text>Spayed</Text>
    ) : (
      <Text>Not Spayed</Text>
    );

  console.log(data);
  return (
    <>
      <Popover trigger="hover">
        <PopoverTrigger>
          <Avatar src={`data:image/png;base64, ${data}`} size={"md"} />
        </PopoverTrigger>
        <PopoverContent minW={{ base: "100%", lg: "max-content" }}>
          <PopoverBody>
            <Grid
              h="250px"
              w={"400px"}
              templateRows="repeat(24, 1fr)"
              templateColumns="repeat(12, 1fr)"
              gap={1}
            >
              <GridItem rowSpan={18} colSpan={5}>
                <CustomAvatar
                  src={`data:image/png;base64, ${data}`}
                  size={"175px"}
                  alt={`A picture of ${dog.name}`}
                />
              </GridItem>
              <GridItem rowSpan={4} colSpan={7}>
                <HStack>
                  {genderIcon}
                  <Text fontSize={"3xl"} as="b">
                    {dog.name}
                  </Text>
                </HStack>
              </GridItem>
              <GridItem rowSpan={2} colSpan={7} pl={2}>
                <Text as="b">{dog.breed}</Text>
              </GridItem>
              <GridItem rowSpan={3} colSpan={7} pl={2}>
                <HStack>
                  <Text as={"b"}>{dog.age}</Text> <BsDot size={"30px"} />{" "}
                  <Text as={"b"}>{alteredStatus}</Text>
                </HStack>
              </GridItem>
              <GridItem rowSpan={8} colSpan={7} bg="black" />
              <GridItem rowSpan={5} colSpan={12} bg="red">
                <Button>Friend Bttn</Button>
              </GridItem>
            </Grid>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </>
  );
}

function DogCardSmall({ dog }: { dog: Dog }) {
  const { data: session } = useSession();
  const { isLoading, data } = useGetDogPhoto(session?.accessToken, dog.id);

  if (isLoading) {
    return <Spinner></Spinner>;
  }

  return (
    <Flex w="full">
      <AspectRatio ratio={220 / 243} minWidth={"180px"}>
        <Box
          bg={"#886E58"}
          maxW="sm"
          borderWidth="1px"
          rounded="18px"
          shadow="lg"
          position="relative"
          textColor={"white"}
          alignContent={"center"}
        >
          <Box p={3} alignContent={"center"}>
            <Image
              src={`data:image/png;base64, ${data}`}
              alt={`Picture of ${dog.name}`}
              rounded="18px"
              boxShadow={
                "0px 1px 18px -5px rgb(0 0 0 / 57%), 0 10px 10px -5px rgb(0 0 0 / 45%)"
              }
            />

            <Text
              fontSize="2xl"
              fontWeight="bold"
              lineHeight="tight"
              pt={1}
              align={"center"}
            >
              {dog.name}
            </Text>
          </Box>
        </Box>
      </AspectRatio>
    </Flex>
  );
}

function PuppyCard() {
  return (
    <Flex p={50} w="full" alignItems="center" justifyContent="center">
      <Box
        bg={"#886E58"}
        maxW="sm"
        borderWidth="1px"
        rounded="18px"
        shadow="lg"
        position="relative"
        textColor={"white"}
      >
        <Popover size={"3xl"}>
          <PopoverTrigger>
            <Box p="6">
              <Image
                alignSelf={"center"}
                src={data.imageURL}
                alt={`Picture of ${data.name}`}
                rounded="18px"
                boxShadow={
                  "0px 1px 18px -5px rgb(0 0 0 / 57%), 0 10px 10px -5px rgb(0 0 0 / 45%)"
                }
              />

              <Flex
                mt="1"
                justifyContent="space-between"
                alignContent="center"
                alignSelf={"center"}
              >
                <Box
                  fontSize="2xl"
                  fontWeight="bold"
                  as="h4"
                  lineHeight="tight"
                >
                  {data.name}
                </Box>
              </Flex>
            </Box>
          </PopoverTrigger>
          <Portal>
            <PopoverContent
              bg={"#F5F5F5"}
              maxWidth={"123px"}
              borderColor={"#886E58"}
            >
              <PopoverArrow bg={"#886E58"} />
              <PopoverHeader>
                <Text color={"#886E58"} fontWeight={"extrabold"}>
                  {data.name}
                </Text>
              </PopoverHeader>
              <PopoverCloseButton />
              <PopoverBody>
                <Text>Sex: {data.sex} </Text>
                <Text>Age: {data.age} </Text>
                <Text>Friends: {data.friends} </Text>
                <Text>Awards: {data.awards}</Text>
              </PopoverBody>
              <Link
                href="/dog-profile"
                style={{
                  textDecoration: "none",
                }}
                alignContent="center"
                colorScheme="#886E58"
              >
                <PopoverFooter>
                  <Flex
                    mt="1"
                    justifyContent="center"
                    alignContent="center"
                    color={"#886E58"}
                    fontWeight={"bold"}
                  >
                    <Text>Visit</Text>
                  </Flex>
                </PopoverFooter>
              </Link>
            </PopoverContent>
          </Portal>
        </Popover>
      </Box>
    </Flex>
  );
}

export { PuppyCard, DogCardSmall, DogAvatarSmall };
