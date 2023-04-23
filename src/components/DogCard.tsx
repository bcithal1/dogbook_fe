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
} from "@chakra-ui/react";
import { useSession } from "next-auth/react";

function PuppyCardSmall({ dog }: { dog: Dog }) {
  const { data: session } = useSession();
  const { status, data } = useGetDogPhoto(session?.accessToken, dog.id);
  const imageHeight = useBreakpointValue({ base: "180px", lg: "150px" });
  console.log({ data });

  if (status === "loading") {
    return <Spinner></Spinner>;
  }

  // return (
  //   <>
  //     <VStack>
  //       <Avatar
  //         name={dog.name}
  //         src={`data:image/png;base64, ${data}`}
  //         size={"2xl"}
  //         css={{
  //           border: "5px solid #886E58",
  //           marginTop: "5px",
  //         }}
  //         boxShadow={
  //           "0px 1px 18px -5px rgb(0 0 0 / 57%), 0 10px 10px -5px rgb(0 0 0 / 45%)"
  //         }
  //       />
  //       <Text
  //         fontSize="lg"
  //         fontWeight="bold"
  //         lineHeight="tight"
  //         align={"center"}
  //       >
  //         {dog.name}
  //       </Text>
  //     </VStack>
  //   </>
  // );

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

export { PuppyCardSmall };
