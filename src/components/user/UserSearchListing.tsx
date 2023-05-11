import { User } from "@/types/user";

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
	return (
		<>
			<div>{user.displayName}</div>
		</>
	);
}

export default UserSearchListing;
