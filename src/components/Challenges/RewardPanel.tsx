import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import React from "react";
import CreateChallengeForm from "./CreateChallengesForm";
import RewardHall from "./RewardHall";
import { Event } from "@/types/event";


function RewardPanel({event}:{event:Event}) {
  return (
    <Tabs align="end" variant="enclosed">
      <TabList>
        <Tab>Create Rewards for your event</Tab>
        <Tab>All rewards</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <CreateChallengeForm event={event} />
        </TabPanel>
        <TabPanel>
          <RewardHall eventId={event.eventId} />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
}

export default RewardPanel;
