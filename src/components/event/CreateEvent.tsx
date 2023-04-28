import withAuth from "@/components/withAuth";
import { Form, Formik, Field, ErrorMessage } from "formik";
import {
	background,
  Button,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  InputGroup,
  InputLeftAddon,
  Spinner,
  Stack,
  Textarea,
} from "@chakra-ui/react";
import { useEffect } from "react";
import * as Yup from "yup";
import { Event } from "@/types/event";
import { useCreateEvent } from "@/queries/event.querues";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

export default function CreateEventForm() {
  const { data: session, status } = useSession();
  const createEvent = useCreateEvent(session?.accessToken);
  const router = useRouter();
  if (status === "loading") {
    return <Spinner></Spinner>;
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

  const submitCreateEvent = async (formValues: Event) => {
    let eventId = null;

    try {
      eventId = (await createEvent.mutateAsync(formValues)).eventId;
    } catch (e) {
      return;
    }

    // router.push(`/events/${eventId}`);
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={submitCreateEvent}
      validationSchema={SignupSchema}
    >
      {(formik) => (
        <Form style={{ margin: "20px 20px 20px 20px ", backgroundColor: "#886E58", width:"30em", height:"35em",padding: "50px 50px", borderRadius:"15px"}} >
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
            <Button type="submit">Create</Button>
          </Stack>
        </Form>
      )}
    </Formik>
  );
}
