import { Challenge } from "@/types/challenges";
import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  Divider,
  Heading,
  Stack,
  Text,
  Image,
  Flex,
} from "@chakra-ui/react";
import React from "react";

function RewardCard({ challenge }: { challenge: Challenge }) {
  return (
    <Flex>
      <Card maxW="sm">
        <CardBody>
          <Image
            src={challenge.rewardImage}
            alt={challenge.description}
            borderRadius="lg"
          />
          <Stack mt="6" spacing="3">
            <Heading size="md">{challenge.name}</Heading>
            <Text>{challenge.description}</Text>
            <Text color="blue.600" fontSize="2xl">
              ${challenge.price}
            </Text>
          </Stack>
        </CardBody>
        <Divider />
        <CardFooter>
          <ButtonGroup spacing="2">
            <Button variant="solid" colorScheme="blue">
              Buy now
            </Button>
            <Button variant="ghost" colorScheme="blue">
              Add to cart
            </Button>
          </ButtonGroup>
        </CardFooter>
      </Card>
    </Flex>
  );
}

export default RewardCard;
