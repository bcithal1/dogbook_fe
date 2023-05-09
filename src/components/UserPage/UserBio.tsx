import { Text, Box, Heading } from "@chakra-ui/react";

function UserBio() {
  return (
    <>
      <Box
        borderWidth="2px"
        borderColor={"blackAlpha.600"}
        rounded="5px"
        shadow="lg"
        w={"full"}
      >
        <Heading size={"l"} px={2} pt={1}>
          About
        </Heading>
        <Text pb={3} align={"center"}>
          If you think I'm handsome, let's box
        </Text>
      </Box>
    </>
  );
}

export default UserBio;
