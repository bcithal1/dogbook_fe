import { DogProfile } from "@/types/dog-profile";
import {
	Flex,
	VStack,
	Text,
	SimpleGrid,
	GridItem,
	useBreakpointValue,
} from "@chakra-ui/react";
import DogProfilePhoto from "./DogProfilePhoto";

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
					>
						<GridItem colSpan={3}>
							<Text>{dogProfile.dog.name}</Text>
						</GridItem>
						<GridItem colSpan={1}>
							<Text>{dogProfile.dog.breed}</Text>
						</GridItem>
						<GridItem colSpan={3}>
							<Text>Friends</Text>
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
						<GridItem colSpan={1}>
							<Text>Dynamic Friend Button Goes here</Text>
						</GridItem>
					</SimpleGrid>
				</VStack>
			</Flex>
		</>
	);
}

export default DogOverView;
