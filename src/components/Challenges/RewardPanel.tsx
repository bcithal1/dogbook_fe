import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import React from "react";
import CreateChallengeForm from "./CreateChallengesForm";
import RewardHall from "./RewardHall";
import { Event } from "@/types/event";
import RewardManagement from "./RewardManagement";
import { UserEventDTO } from "@/types/userEventDTO";


function RewardPanel({event}:{event:Event}) {
  return (
    <Tabs align="end" variant="enclosed">
      <TabList>
        <Tab>Create Rewards for your event</Tab>
        <Tab>All rewards</Tab>
        <Tab>Rewards Management</Tab>
        <Tab>Voting</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <CreateChallengeForm event={event} />
        </TabPanel>
        <TabPanel>
          <RewardHall eventId={event.eventId} />
        </TabPanel>
        <TabPanel>
          <RewardManagement event={event} />
        </TabPanel>
        <TabPanel>
          
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
}

export default RewardPanel;
