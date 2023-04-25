import { DogProfile } from "@/types/dog-profile";
import { Box, Heading, Text } from "@chakra-ui/react";

function AboutDog({ dogProfile }: { dogProfile: DogProfile }) {
	return (
		<>
			<Box
				pt={"20px"}
				pb={"20px"}
				pl={"20px"}
				rounded="10px"
				w={"full"}
				css={{
					border: "1px solid #886E58",
					backgroundColor: "white",
				}}
				boxShadow={
					"0px 1px 10px -5px rgb(0 0 0 / 57%), 0 10px 10px -5px rgb(0 0 0 / 45%)"
				}
			>
				<Heading color={"#886E58"} fontSize={"xl"}>
					About{" "}
					{dogProfile.dog.name.charAt(0).toUpperCase() +
						dogProfile.dog.name.slice(1)}
				</Heading>
				<Text>Age: {dogProfile.dog.age} </Text>
				<Text>
					Size:{" "}
					{dogProfile.dog.size.charAt(0) +
						dogProfile.dog.size.slice(1).toLowerCase()}{" "}
				</Text>
				<Text>
					Sex:{" "}
					{dogProfile.dog.sex.charAt(0) +
						dogProfile.dog.sex.slice(1).toLowerCase()}
				</Text>
				<Text>Weight: {dogProfile.dog.weightLbs} lbs</Text>
				<Text>Bio: {dogProfile.bio}</Text>
				<Text>Temperament: {dogProfile.temperament}</Text>
				<Text>Tricks: </Text>
			</Box>
		</>
	);
}
export default AboutDog;
