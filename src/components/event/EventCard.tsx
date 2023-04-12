import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Box,
  Badge,
  Image,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import { Event } from "@/types/event";
import { StarIcon } from "@chakra-ui/icons";

function EventCard({ event }: { event: Event }) {
  return (
    <Box w='69%' borderWidth="1px" borderRadius="lg" overflow="hidden" bg={"#886E58"}>
      {/* <Image src={`https://loremflickr.com/320/240/nature?${event.eventId}`} />

      <Box p='6'>
        <Box display='flex' alignItems='baseline'>
          <Badge borderRadius='full' px='2' colorScheme='teal'>
            
          </Badge>
          <Box
            color='gray.500'
            fontWeight='semibold'
            letterSpacing='wide'
            fontSize='xs'
            textTransform='uppercase'
            ml='2'
          >
             {`event date: ${event.date}`} {`event location: ${event.eventLocation}`}
          </Box>
        </Box>

        <Box
          mt='1'
          fontWeight='semibold'
          as='h4'
          lineHeight='tight'
          noOfLines={1}
        >
          {`${event.eventTitle}`}
        </Box>

        <Box
          mt='1'
          fontWeight='semibold'
          as='h4'
          lineHeight='tight'
          noOfLines={1}
        >
        {`event Host: ${event.hostId}`}  
        </Box>

        <Box
          mt='1'
          fontWeight='semibold'
          as='h4'
          lineHeight='tight'
          noOfLines={1}
        >
        {`Description: ${event.eventDescription}`} 
        </Box>
        <Box
          mt='1'
          fontWeight='semibold'
          as='h4'
          lineHeight='tight'
          noOfLines={1}
        >

          
        {JSON.stringify(event.eventUserRelations)} 
        </Box>

      </Box> */}

      <Grid
        templateAreas={`"nav header time"
                  "nav main footer"
                  "nav main footer"`}
        gridTemplateRows={"ifr 2fr"}
        gridTemplateColumns={"1fr 5fr 3fr"}
        h="200px"
        gap="1"
        color="blackAlpha.700"
        fontWeight="bold"
      >
        <GridItem pl="2" bg="#886E58" area={"header"}>
          Header
        </GridItem>
        <GridItem pl="2" bg="pink.300" area={"nav"}>
          Nav
        </GridItem>
        <GridItem pl="2" bg="green.300" area={"main"}>
          Main
        </GridItem>
        <GridItem pl="2" bg="blue.300" area={"footer"}>
          Footer
        </GridItem>
        <GridItem pl="2" bg="red.300" area={"time"}>
          time
        </GridItem>
      </Grid>
    </Box>
  );
}

export default EventCard;
