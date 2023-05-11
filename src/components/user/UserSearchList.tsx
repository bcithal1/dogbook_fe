import { useGetAllUsers } from "@/queries/user.queries";
import { Search2Icon } from "@chakra-ui/icons";
import {
	Button,
	Container,
	Input,
	InputGroup,
	InputLeftElement,
	InputRightAddon,
	Spinner,
} from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import UserSearchListing from "./UserSearchListing";

function UserSearchList() {
	const { data: session } = useSession();
	const { status, data: users } = useGetAllUsers(session?.accessToken);

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
					paddingTop={"10px"}
					marginTop={"10px"}
				>
					<InputGroup
						size="md"
						borderRadius={10}
						backgroundColor={"white"}
						marginTop={"10px"}
						width="md"
					>
						<InputLeftElement
							pointerEvents="none"
							children={<Search2Icon color="gray.600" />}
						/>
						<Input
							type="text"
							placeholder="Search users"
							border="1px solid #949494"
						/>
						{/* <InputRightAddon p={0} border="none">
							<Button size="sm" border="1px solid #949494">
								Search
							</Button>
						</InputRightAddon> */}
					</InputGroup>
					{users.map((user) => (
						<UserSearchListing user={user} accessToken={session?.accessToken} />
					))}
				</Container>
			</>
		);
	}
}

export default UserSearchList;
