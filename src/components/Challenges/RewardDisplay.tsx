import { getChallengeUserRelationByUserId } from '@/queries/challenges.queries'
import { UserEventDTO } from '@/types/userEventDTO';
import { Box, Spinner, Image } from '@chakra-ui/react';
import { useSession } from 'next-auth/react';
import React from 'react'

function RewardDisplay({DTO}:{DTO:UserEventDTO}) {
  const { data: session } = useSession();
  const {challengeUserStatus, challengeUserData} = getChallengeUserRelationByUserId(session?.accessToken, DTO.userId, DTO.eventId)
  
  if(challengeUserStatus === "loading") return <Spinner />
  if(challengeUserStatus === "error") return <>getChallengeUserRelationByUserId call failed</>

  return (
    <Box>
      {challengeUserData && challengeUserData.map((each)=>{
        return(<Image
          src={each.rewardPhoto}
          borderRadius="lg"
          width={"1.5em"}
        />)
      })}
    </Box>
  )
}

export default RewardDisplay