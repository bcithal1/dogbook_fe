import CreateEventForm from "@/components/event/CreateEvent";
import withAuth from "@/components/withAuth";

function CreateEvent() {
	return <CreateEventForm />;
}
export default withAuth(CreateEventForm);
