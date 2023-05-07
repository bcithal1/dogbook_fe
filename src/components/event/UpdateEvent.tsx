import React from 'react'
import * as Yup from "yup";
import { Field, Form, Formik } from 'formik';
import { Button, FormControl, FormErrorMessage, FormLabel, Input, Textarea } from '@chakra-ui/react';
import { useSession } from 'next-auth/react';
import { updateEventByHost } from '@/queries/event.querues';
import { Event } from "@/types/event";
import Loader from '../Loader';





function UpdateEvent({event_Id}:{event_Id:number}) {
  const { data: session, status } = useSession();


  const updateEvent = updateEventByHost(session?.accessToken);  

  const onSubitToUpdateEvent=(formValues: Event)=>{
    updateEvent.mutate({event_Id, formValues})
  }
  
  if (status === "loading") {
    return <Loader />;
  }

  const initialValues: Event = {
    eventId: 0,
    hostId: session.user.id,
    eventTitle: "",
    eventLocation: "",
    eventDescription: "",
    date: "",
    eventUserRelations: [],
  };

  const SignupSchema = Yup.object().shape({
    eventTitle: Yup.string()
      .min(2, "Title must be at least two characters")
      .required("This field is required"),
    eventLocation: Yup.string()
      .min(2, "Location must be at least two characters")
      .required("This field is required"),
    date: Yup.date().required("This field is required"),
    eventDescription: Yup.string().required("This field is required"),
  });

  

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubitToUpdateEvent}
      validationSchema={SignupSchema}
    >
      {(formik) => (
        <Form style={{ margin: "20px 20px 20px 20px ", backgroundColor:"blue.800", width:"15em", padding: "50px 50px", borderRadius:"15px"}} >
          <Stack spacing={4}>
            <Input type="hidden" name="eventId" />
            <Input type="hidden" name="hostId" />
            <FormControl
              isRequired
              isInvalid={
                formik.errors.eventTitle && formik.touched.eventTitle
                  ? true
                  : false
              }
            >
              
              <FormLabel>Title</FormLabel>
              <Input
                type="text"
                name="eventTitle"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <FormErrorMessage>{formik.errors.eventTitle}</FormErrorMessage>
            </FormControl>
            <FormControl
              isRequired
              isInvalid={
                formik.errors.eventLocation && formik.touched.eventLocation
                  ? true
                  : false
              }
            >
              <FormLabel>Location</FormLabel>
              <Input
                type="text"
                name="eventLocation"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <FormErrorMessage>{formik.errors.eventLocation}</FormErrorMessage>
            </FormControl>
            <FormControl
              isRequired
              isInvalid={
                formik.errors.date && formik.touched.date ? true : false
              }
            >
              <FormLabel>Date</FormLabel>
              <Input
                type="date"
                name="date"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <FormErrorMessage>{formik.errors.date}</FormErrorMessage>
            </FormControl>
            <FormControl
              isRequired
              isInvalid={
                formik.errors.eventDescription &&
                formik.touched.eventDescription
                  ? true
                  : false
              }
            >
              <FormLabel>Description</FormLabel>
              <Textarea
                name="eventDescription"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.eventDescription}
              />
              <FormErrorMessage>
                {formik.errors.eventDescription}
              </FormErrorMessage>
            </FormControl>
            <Button type="submit" colorScheme={"teal"}>Create</Button>
          </Stack>
        </Form>
      )}
    </Formik>
  );
}

export default UpdateEvent