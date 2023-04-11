import { Dog } from "@/types/dog";
import { Box, Heading, Text } from "@chakra-ui/react";

function AboutDog({ dog }: { dog: Dog }) {
	return (
		<Box
			pt={"20px"}
			pb={"20px"}
			rounded="10px"
			width={"xs"}
			paddingLeft={"15px"}
			css={{
				border: "1px solid #886E58",
				backgroundColor: "white",
			}}
			marginBottom={"20px"}
			boxShadow={
				"0px 1px 10px -5px rgb(0 0 0 / 57%), 0 10px 10px -5px rgb(0 0 0 / 45%)"
			}
		>
			<Heading color={"#886E58"} fontSize={"xl"}>
				About
			</Heading>
			<Text>Age: {dog.age} </Text>
			<Text>Size: {dog.size.charAt(0) + dog.size.slice(1).toLowerCase()} </Text>
			<Text>Sex: {dog.sex.charAt(0) + dog.sex.slice(1).toLowerCase()}</Text>
			<Text>Weight: {dog.weightLbs} lbs</Text>
			<Text> </Text>
			<Text>Likes</Text>
			<Text>Temperament</Text>
		</Box>
	);
}
export default AboutDog;
