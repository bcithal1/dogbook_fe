import { Avatar, Box, Heading, Link, Text } from "@chakra-ui/react";

function AboutParent() {
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
			boxShadow={
				"0px 1px 10px -5px rgb(0 0 0 / 57%), 0 10px 10px -5px rgb(0 0 0 / 45%)"
			}
		>
			<Heading color={"#886E58"} fontSize={"xl"}>
				Owner information
			</Heading>
			<Avatar
				size={"md"}
				src={"/Assets/LargeDogs/avatar-blake.png"}
				title="Ziggy"
				css={{
					border: "1px solid #886E58",
					marginTop: "5px",
				}}
				boxShadow={
					"0px 1px 18px -5px rgb(0 0 0 / 57%), 0 10px 10px -5px rgb(0 0 0 / 45%)"
				}
			/>
			<Text>Owner name*</Text>
			<Link fontWeight={"semibold"} color={"#886E58"}>
				See profile*
			</Link>
		</Box>
	);
}
export default AboutParent;
