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
} from "@chakra-ui/react";

const data = {
  imageURL: "/Assets/smalldog1.png",
  name: "Tommy",
  age: "6",
  sex: "male",
  friends: 12,
  awards: 3,
};

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

export default PuppyCard;
