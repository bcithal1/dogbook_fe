import { DogProfile } from "@/types/dog-profile";
import { Avatar, Box, Heading, HStack, Text } from "@chakra-ui/react";
import Link from "next/link";

function AboutParent({
	dogProfile,
	userId,
}: {
	dogProfile: DogProfile;
	userId: number;
}) {
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
					Owner information
				</Heading>
				<HStack>
					<Avatar
						size={"lg"}
						src={`data:image/png;base64`}
						title="Ziggy"
						css={{
							border: "5px solid #886E58",
							marginTop: "5px",
						}}
						boxShadow={
							"0px 1px 18px -5px rgb(0 0 0 / 57%), 0 10px 10px -5px rgb(0 0 0 / 45%)"
						}
					/>
					<Text>
						Sex:{" "}
						{dogProfile.dog.sex.charAt(0) +
							dogProfile.dog.sex.slice(1).toLowerCase()}
					</Text>
				</HStack>
				<Link href={""}>
					<Heading fontSize={"medium"}>See profile</Heading>
				</Link>
			</Box>
		</>
	);
}
export default AboutParent;
