import { getAllUserEventDto } from "@/queries/userEventDTO.queries";
import {
  Avatar,
  Button,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Image,
  Spinner,
} from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import DogCardForEvent from "../event/DogCardForEvent";
import { Event } from "@/types/event";
import { UserEventDTO } from "@/types/userEventDTO";
import {
  assignChallengToUser,
  getChallengesByEventId,
} from "@/queries/challenges.queries";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { Challenge } from "@/types/challenges";

function RewardManagement({event}:{event:Event}) {
  const { data: session } = useSession();
  const { DTOListstatus, DTOListdata } = getAllUserEventDto(
    session?.accessToken,
    event.eventId
  );
  const assignChallangeToUser = assignChallengToUser(session?.accessToken);
  const { status, data } = getChallengesByEventId(
    session?.accessToken,
    event.eventId
  );
  const [rewardSelect, setRewardSelect] = useState<Challenge>(null)

  if (status === "loading" )
    return <Spinner color="red.500" />;
  if (status === "error" )
    return <Flex>the get ChakkengesByEventId Call has failed</Flex>;

  const handleAssign = (DTO: UserEventDTO) => {

    let challengeId = rewardSelect.id
    let userId = DTO.userId
    assignChallangeToUser.mutate({challengeId, userId});
  };

  return (
    <Flex flexDirection={"column"}>
      <Flex>
        <Menu>
          <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
            Rewards
          </MenuButton>

          <MenuList>
            {data &&
              data.map((challenge) => {
                return (
                  <MenuItem minH="48px" onClick={()=>setRewardSelect(challenge)}>
                    <Image
                      boxSize="2rem"
                      borderRadius="full"
                      src={challenge.rewardImage}
                      alt="Fluffybuns the destroyer"
                      mr="12px"
                    />
                    <span>{challenge.name}</span>
                  </MenuItem>
                );
              })}
          </MenuList>
        </Menu>
        
      </Flex>

    <Flex>
          Reward selected: {rewardSelect? rewardSelect.name: "please select a reward"}
        </Flex>
      <Flex
        flexDirection={"row"}
        gap="5"
        flexWrap={"wrap"}
        mt="2em"
        justifyContent={"center"}
      >
        {DTOListdata
          ? DTOListdata.map((DTO) => {
              return (
                <Flex
                  flexDirection={"column"}
                  backgroundColor="#C2C0C7"
                  width="180px"
                  height="190px"
                  gap={"1.5"}
                  borderRadius="18"
                  fontFamily={"sans-serif"}
                  fontSize="16"
                  pt={"2"}
                >
                  <Flex justifyContent={"space-around"}>
                    <Flex><Avatar src={DTO.profilePhotoUrl} /></Flex>
                    <Flex><Button onClick={() => handleAssign(DTO)}>Assign</Button></Flex>
                  </Flex>
                  <Flex ml={"2"}>{DTO.userName}</Flex>
                  <Flex ml={"2"}>
                    {DTO.eventAccessLevel === "EVENT_HOST" ? "Host" : "Guest"}
                  </Flex>
                  <Flex ml={"2"} color="teal">
                    {DTO.eventInvitedStatus} {DTO.goingStatus}
                  </Flex>
                  <Flex>
                    <DogCardForEvent userId={DTO.userId} />
                  </Flex>
                </Flex>
              );
            })
          : null}
      </Flex>
    </Flex>
  );
}

export default RewardManagement;
