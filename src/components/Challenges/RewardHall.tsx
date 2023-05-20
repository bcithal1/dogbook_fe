import { getChallengesByEventId } from "@/queries/challenges.queries";
import { Box, Flex, Spinner } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import React from "react";
import RewardCard from "./RewardCard";

function RewardHall({ eventId }: { eventId: number }) {
  const { data: session } = useSession();
  const { status, data } = getChallengesByEventId(
    session?.accessToken,
    eventId
  );

  if (status === "loading") return <Spinner color="red.500" />;
  if (status === "error")
    return <Flex>the get ChakkengesByEventId Call has failed</Flex>;
  return (
    <Box>
      <Flex flexWrap={"wrap"} gap={"3"} justifyContent={"center"}>
        {data &&
          data.map((challenge, index) => {
            return <RewardCard challenge={challenge} key={index} />;
          })}
      </Flex>
    </Box>
  );
}

export default RewardHall;
