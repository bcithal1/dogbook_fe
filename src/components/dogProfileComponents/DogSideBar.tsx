import { useGetDogOwnersByDogId } from "@/queries/dog.queries";
import { DogProfile } from "@/types/dog-profile";
import {
	Flex,
	VStack,
	Text,
	useBreakpointValue,
	Spinner,
} from "@chakra-ui/react";
import { Session } from "next-auth";
import AboutDog from "./AboutDog";
import AboutParent from "./AboutParent";
import BreedInfo from "./BreedInfo";

function DogSideBar({
	dogProfile,
	session,
}: {
	dogProfile: DogProfile;
	session: Session;
}) {
	const colSpan = useBreakpointValue({ base: "full", md: "75%" });

	const { status, data: dogOwners } = useGetDogOwnersByDogId(
		session.accessToken,
		dogProfile.dog.id
	);

	if (status === "loading") {
		return <Spinner />;
	}

	if (status === "success") {
		return (
			<>
				<Flex h={"full"} py={5} direction={{ base: "column", md: "row" }}>
					<VStack
						w={colSpan}
						h={"full"}
						spacing={4}
						px={4}
						alignItems="flex-start"
					>
						<AboutDog dogProfile={dogProfile} />
						<AboutParent
							dogProfile={dogProfile}
							accessToken={session.accessToken}
							dogOwnerId={dogOwners?.[0]?.userId}
						/>
						{dogProfile.dog.breedId != 0 ? (
							<BreedInfo
								dog={dogProfile.dog}
								accessToken={session.accessToken}
							/>
						) : null}
					</VStack>
					<VStack
						w={"full"}
						h={"full"}
						p={10}
						spacing={10}
						alignItems="flex-start"
						rounded="10px"
						css={{
							border: "1px solid #886E58",
							backgroundColor: "white",
						}}
						boxShadow={
							"0px 1px 10px -5px rgb(0 0 0 / 57%), 0 10px 10px -5px rgb(0 0 0 / 45%)"
						}
					>
						<Text>THIS IS WHERE THE DOG FEED WILL GO</Text>
					</VStack>
				</Flex>
			</>
		);
	}
}

export default DogSideBar;
