import { User } from "@/types/user";
import { Heading, Box, Text, Button } from "@chakra-ui/react";
import { useRouter } from "next/router";

function UserSearchListing({
	accessToken,
	user,
}: {
	accessToken: string;
	user: User;
}) {
	// if (status === "loading") {
	// 	return <Spinner></Spinner>;
	// }

	// if (status === "success") {
	const router = useRouter();

	function handleClick() {
		router.push({
			pathname: `/user-profile`,
			query: { myParam: JSON.stringify(user.id) },
		});
	}
	return (
		<>
			<Box>
				<Heading size="xs" textTransform="uppercase" color="#886E58">
					{user.displayName}
				</Heading>
				<Text color={"#4A5568"} onClick={handleClick} pt="2" fontSize="sm">
					See profile
				</Text>
			</Box>
		</>
	);
}

export default UserSearchListing;
