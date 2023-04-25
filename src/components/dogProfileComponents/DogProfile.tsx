import { useGetDogProfileByDogId } from "@/queries/dog.queries";
import { Container, Spinner } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import AboutDog from "./AboutDog";
import DogOverView from "./DogOverview";
import DogShortcutBar from "./DogShortcutBar";
import DogSideBar from "./DogSideBar";
import ProfileSummaryBar from "./ProfileSummaryBar";

function DogPage({ dogId }: { dogId: number }) {
	const { data: session } = useSession();
	const { status, data: dogProfile } = useGetDogProfileByDogId(
		session?.accessToken,
		dogId
	);

	if (status === "loading") {
		return <Spinner></Spinner>;
	}

	if (status === "success") {
		return (
			<>
				<Container
					maxW="container.xl"
					backgroundColor={"#F5F2EA"}
					rounded={"lg"}
				>
					<DogOverView
						dogProfile={dogProfile}
						accessToken={session.accessToken}
					/>
					<DogShortcutBar dogProfile={dogProfile} />
					<DogSideBar dogProfile={dogProfile} session={session} />
				</Container>
			</>
		);
	}
}

export default DogPage;
