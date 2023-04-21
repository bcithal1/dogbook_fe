import { useGetDogPhoto } from "@/queries/dog.queries";
import { Dog } from "@/types/dog";
import {
  Flex,
  Box,
  Image,
  Text,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverTrigger,
  Portal,
  Link,
  Spinner,
  useBreakpointValue,
} from "@chakra-ui/react";
import { useSession } from "next-auth/react";

function PuppyCardSmall({ dog }: { dog: Dog }) {
  const { data: session } = useSession();
  const { status, data } = useGetDogPhoto(session?.accessToken, dog.id);
  const imageHeight = useBreakpointValue({ base: "3px", md: "3px" });
  console.log({ data });

  if (status === "loading") {
    return <Spinner></Spinner>;
  }

  return (
    <Flex w="full">
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
                minHeight={`${imageHeight}`}
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
          </PopoverTrigger>
      </Box>
    </Flex>
  );
}

export { PuppyCardSmall };
