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
} from "@chakra-ui/react";
import { useSession } from "next-auth/react";

function PuppyCardSmall({ dog }: { dog: Dog }) {
  const { data: session } = useSession();
  const { status, data } = useGetDogPhoto(session?.accessToken, dog.id);
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
        <Popover size={"3xl"}>
          <PopoverTrigger>
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
                  {dog.name}
                </Text>
              </PopoverHeader>
              <PopoverCloseButton />
              <PopoverBody>
                <Text>Sex: {dog.sex} </Text>
                <Text>Age: {dog.age} </Text>
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

export { PuppyCardSmall };
