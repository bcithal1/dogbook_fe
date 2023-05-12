import {
  Button,
  Flex,
  Heading,
  Image,
  Link,
  Stack,
  Text,
  useBreakpointValue,
} from '@chakra-ui/react';

export default function HeroSection() {
  return (
    <Stack minH={'100vh'} direction={{ base: 'column', md: 'row' }} bg={"#F5F2EA"}>
      <Flex p={8} flex={1} align={'center'} justify={'center'}>
        <Stack spacing={6} w={'full'} maxW={'lg'}>
          <Heading fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }}>
            <Text
              as={'span'}
              position={'relative'}
              _after={{
                content: "''",
                width: 'full',
                height: useBreakpointValue({ base: '20%', md: '30%' }),
                position: 'absolute',
                bottom: 1,
                left: 0,
                bg: '#886E58',
                zIndex: -1,
              }}>
              Whistl
            </Text>
            <br />{' '}
            <Text color={'#886E58'} as={'span'}>
              Your dog's best friend
            </Text>{' '}
          </Heading>
          <Text fontSize={{ base: 'md', lg: 'lg' }} color={'gray.500'}>
            Our Mission: Help your dog keep track of all their doggy friends!
          </Text>
          <Stack direction={{ base: 'column', md: 'row' }} spacing={4}>
            <Button
              rounded={'full'}
              bg={'#886E58'}
              color={'white'}
              _hover={{
                bg: '#886E58',
              }}
              >
              <Link href='/create'>Create Pup Profile</Link>
            </Button>
          </Stack>
        </Stack>
      </Flex>
      <Flex flex={1}>
        <Image
          alt={'Login Image'}
          objectFit={'cover'}
          src={
            'https://www.holidayhousepetresort.com/wp-content/uploads/2014/05/969228_10151763701496645_111782353_n.jpg'
          }
        />
      </Flex>
    </Stack>
  );
}