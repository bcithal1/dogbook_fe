import { useGetDogOwnersByDogId } from "@/queries/dog.queries";
import { DogProfile } from "@/types/dog-profile";
import {
	Flex,
	VStack,
	Text,
	SimpleGrid,
	GridItem,
	useBreakpointValue,
	Heading,
	Spinner,
} from "@chakra-ui/react";
import DogProfilePhoto from "./DogProfilePhoto";
import EditButton from "./EditButton";

function DogOverView({
	dogProfile,
	accessToken,
}: {
	dogProfile: DogProfile;
	accessToken: string;
}) {
	const buttonSpacer = useBreakpointValue({ base: 1, md: "60px" });

	return (
		<>
			<Flex
				h={{ base: "auto" }}
				py={5}
				direction={{ base: "column", md: "row" }}
			>
				<DogProfilePhoto
					id={dogProfile.profilePhotoId}
					accessToken={accessToken}
				/>
				<VStack>
					<SimpleGrid
						columns={3}
						columnGap={3}
						rowGap={4}
						w={"full"}
						pt={3}
						pl={3}
						ml={1}
					>
						<GridItem colSpan={3} marginTop={"30px"}>
							<Heading size={"md"}>{dogProfile.dog.name}</Heading>
						</GridItem>
						<GridItem colSpan={1}>
							<Heading color={"#886E58"} size={"sm"}>
								{dogProfile.dog.breed}
							</Heading>
						</GridItem>
					</SimpleGrid>
				</VStack>
				<VStack marginLeft={"auto"}>
					<SimpleGrid
						columns={2}
						columnGap={3}
						rowGap={buttonSpacer}
						w={"full"}
						pt={3}
						pl={3}
					>
						<GridItem>
							<EditButton dogProfile={dogProfile} accessToken={accessToken} />
						</GridItem>
					</SimpleGrid>
				</VStack>
			</Flex>
		</>
	);
}

export default DogOverView;
