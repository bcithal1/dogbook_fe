import { useGetDogPhoto } from "@/queries/dog.queries";
import { Dog } from "@/types/dog";
import {
  Flex,
  Box,
  Image,
  Text,
  PopoverTrigger,
  Spinner,
  useBreakpointValue,
  AspectRatio,
  Card,
  CardBody,
  Heading,
  Stack,
  Avatar,
  HStack,
  VStack,
  Popover,
  PopoverContent,
  PopoverHeader,
  PopoverCloseButton,
  PopoverArrow,
  PopoverBody,
  Container,
  Grid,
  GridItem,
  Button,
} from "@chakra-ui/react";
import { useSession } from "next-auth/react";

function DogAvatarSmall({ dog }: { dog: Dog }) {
  const { data: session } = useSession();
  const { status, data } = useGetDogPhoto(session?.accessToken, dog.id);

  if (status === "loading") {
    return <Spinner></Spinner>;
  }

  return (
    <>
      <Popover trigger="hover">
        <PopoverTrigger>
          <Avatar src={`data:image/png;base64, ${data}`} size={"md"} />
        </PopoverTrigger>
        <PopoverContent>
          {/* <PopoverHeader fontWeight="semibold">RIKA!</PopoverHeader> */}
          <PopoverBody>
            <Grid
              h="225px"
              templateRows="repeat(24, 1fr)"
              templateColumns="repeat(12, 1fr)"
              gap={2}
            >
              <GridItem rowSpan={18} colSpan={5} bg="tomato">
                {" "}
                <Avatar src={`data:image/png;base64, ${data}`} size={"2xl"} />
              </GridItem>
              <GridItem rowSpan={5} colSpan={7} bg="green">
                <Text fontSize={"2xl"} as="b">
                  {dog.name}
                </Text>
              </GridItem>
              <GridItem rowSpan={1} colSpan={7} bg="white" />
              <GridItem rowSpan={6} colSpan={7} bg="blue" />
              <GridItem rowSpan={6} colSpan={7} bg="black" />
              <GridItem rowSpan={1} colSpan={12} bg="white" />
              <GridItem rowSpan={5} colSpan={5} bg="red">
                <Button>Friend Bttn</Button>
              </GridItem>
              <GridItem rowSpan={5} colSpan={5} bg="cyan">
                <Button>Msg Bttn</Button>
              </GridItem>
              <GridItem rowSpan={5} colSpan={2} bg="tan">
                <Button>...</Button>
              </GridItem>
            </Grid>
            {/* <Avatar src={`data:image/png;base64, ${data}`} size={"2xl"} /> */}
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </>
  );
}

function DogCardSmall({ dog }: { dog: Dog }) {
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
              // backgroundSize="fill"
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

export { DogCardSmall, DogAvatarSmall };
