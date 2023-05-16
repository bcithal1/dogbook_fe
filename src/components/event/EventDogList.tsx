import { Dog } from "@/types/dog";
import { UserEventDTO } from "@/types/userEventDTO";
import {
  useDisclosure,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  Flex,
} from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import React from "react";
import DataAnalytic from "./DataAnalytic";
import DogCardForEvent from "./DogCardForEvent";

function EventDogList({DTOListdata, eventId}:{DTOListdata:UserEventDTO[], eventId:number}) {
  const { data: session } = useSession();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();
  

  return (
    <Flex>
      <Button ref={btnRef} colorScheme="teal" onClick={onOpen}>
      Puppies at the Event
      </Button>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
        size="md"
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Puppies at the event</DrawerHeader>

          <DrawerBody>
            <Flex>
              {DTOListdata && DTOListdata.map((DTO)=>{
                return(<DogCardForEvent userId={DTO.userId} />)
              }) }        
            </Flex>

            <Flex mt="3em" fontFamily={"sans-serif"}>
                Event Stats
            </Flex>  
            <Flex mt="1em">
                <DataAnalytic eventId={eventId}/>

            </Flex>
          </DrawerBody>

          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="blue">Save</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </Flex>
  );
}

export default EventDogList;
