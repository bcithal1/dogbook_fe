import { DogProfile } from "@/types/dog-profile";
import { Avatar, Link, Stack, Text } from "@chakra-ui/react";
import { useSession } from "next-auth/react";

function ProfileSummaryBar({ dogProfile }: { dogProfile: DogProfile }) {
	return (
		<>
			<Avatar
				size={"2xl"}
				src={"/Assets/LargeDogs/avatar-blake.png"}
				title="Ziggy"
				css={{
					border: "5px solid #886E58",
					marginTop: "5px",
				}}
				boxShadow={
					"0px 1px 18px -5px rgb(0 0 0 / 57%), 0 10px 10px -5px rgb(0 0 0 / 45%)"
				}
			/>
			<Stack marginTop={"5px"} marginLeft={"10px"}>
				<Text>
					{dogProfile.dog.name.charAt(0).toUpperCase() +
						dogProfile.dog.name.slice(1)}
				</Text>
				<Link>Friends* </Link>
				<Link>Mutual*</Link>
			</Stack>
			<></>
		</>
	);
}
export default ProfileSummaryBar;
