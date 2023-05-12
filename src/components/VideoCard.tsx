import { Box, Text, Flex, HStack, Link, chakra } from "@chakra-ui/react";

export default function VideoCards() {
  return (
    
    <div>
      <chakra.h1
        textAlign={'center'}
        bg={"#F5F2EA"}
        color={'#886E58'}
        fontSize={'4xl'}
        fontWeight={'bold'}>
        Pup Training Videos!
      </chakra.h1>
      <Flex

        justify="space-evenly"
        justifyContent="center"
        wrap="wrap"
        gap="9"
        bg={"#F5F2EA"}
      >
      
        <Box
          w="300px"
          rounded="sm"
          borderRadius={20}
          my={5}
          mx={[0, 5]}
          overflow="hidden"
          bg="white"
          border="3px"
          borderColor="#886E58"
          boxShadow={
            "0px 1px 25px -5px rgb(0 0 0 / 57%), 0 10px 10px -5px rgb(0 0 0 / 45%)"
          }
        >
          {/* video card and link */}
          <Box
            h="200px"
            borderBottom="1px"
            borderColor="#886E58"
            as="iframe"
            src="https://www.youtube.com/embed/ZtpLvumSTzI"
            width="100%"
            sx={{
              aspectRatio: "16/9",
            }}
          />
          <Box p={4}>
            <Text fontSize={"xs"} fontWeight="medium">
              Train any Dog How To Play Fetch PERFECTLY
            </Text>
          </Box>
          <HStack borderTop="1px" color="#886E58">
            <Flex
              p={4}
              alignItems="center"
              justifyContent="space-between"
              roundedBottom="lg"
              cursor="pointer"
              w="full"
            >
              <Text fontSize="md" fontWeight="semibold">
                <Link
                  href="https://www.youtube.com/embed/ZtpLvumSTzI"
                  isExternal
                  style={{
                    textDecoration: "none",
                  }}
                  title="Training video on YouTube"
                >
                  Check it out on Youtube{" "}
                </Link>
              </Text>
            </Flex>
          </HStack>
        </Box>

        <Box
          w="300px"
          rounded="sm"
          borderRadius={20}
          my={5}
          mx={[0, 5]}
          overflow="hidden"
          bg="white"
          border="3px"
          borderColor="#886E58"
          boxShadow={
            "0px 1px 25px -5px rgb(0 0 0 / 57%), 0 10px 10px -5px rgb(0 0 0 / 45%)"
          }
        >
          <Box
            h="200px"
            borderBottom="1px"
            borderColor="#886E58"
            as="iframe"
            src="https://www.youtube.com/embed/CRoDTUkzVpU"
            width="100%"
            sx={{
              aspectRatio: "16/9",
            }}
          />
          <Box p={4}>
            <Text fontSize={"xs"} fontWeight="medium">
              Train any Dog How To Shake PERFECTLY
            </Text>
          </Box>
          <HStack borderTop="1px" color="#886E58">
            <Flex
              p={4}
              alignItems="center"
              justifyContent="space-between"
              roundedBottom="lg"
              cursor="pointer"
              w="full"
            >
              <Text fontSize="md" fontWeight="semibold">
                <Link
                  href="https://www.youtube.com/embed/CRoDTUkzVpU"
                  isExternal
                  style={{
                    textDecoration: "none",
                  }}
                  title="Training video on YouTube"
                >
                  Check it out on Youtube
                </Link>
              </Text>
            </Flex>
          </HStack>
        </Box>

        <Box
          w="300px"
          rounded="sm"
          borderRadius={20}
          my={5}
          mx={[0, 5]}
          overflow="hidden"
          bg="white"
          border="3px"
          borderColor="#886E58"
          boxShadow={
            "0px 1px 25px -5px rgb(0 0 0 / 57%), 0 10px 10px -5px rgb(0 0 0 / 45%)"
          }
        >
          <Box
            h="200px"
            borderBottom="1px"
            borderColor="#886E58"
            as="iframe"
            src="https://www.youtube.com/embed/NMRRLUyAIyw"
            width="100%"
            sx={{
              aspectRatio: "16/9",
            }}
          />
          <Box p={4}>
            <Text fontSize={"xs"} fontWeight="medium">
              Train Any Dog How To Roll Over and Play Dead
            </Text>
          </Box>
          <HStack borderTop="1px" color="#886E58">
            <Flex
              p={4}
              alignItems="center"
              justifyContent="space-between"
              roundedBottom="lg"
              cursor="pointer"
              w="full"
            >
              <Text fontSize="md" fontWeight="semibold">
                <Link
                  href="https://www.youtube.com/embed/NMRRLUyAIyw"
                  isExternal
                  style={{
                    textDecoration: "none",
                  }}
                  title="Training video on YouTube"
                >
                  Check it out on Youtube
                </Link>
              </Text>
            </Flex>
          </HStack>
        </Box>
      </Flex>
    </div>
  );
}
