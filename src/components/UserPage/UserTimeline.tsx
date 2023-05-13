import { getAllPostsByCurrentUser } from "@/queries/post.queries";
import { Flex } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import React from "react";
import UserSideBar from "./UserSideBar";
import TimelinePost from "../TimelinePost";
import { User } from "@/types/user";

function UserTimeline({ accessToken }: { accessToken: string }) {
	const { data: session } = useSession();
	const { status: postStatus, data: postData } = getAllPostsByCurrentUser(
		session?.accessToken,
		"6"
	);

	if (postStatus === "loading") {
		return <>is loading</>;
	}

	if (postStatus === "error") {
		return <>error calling apis</>;
	}

	if (postStatus === "success") {
		return (
			<Flex>
				{postData.map((post) => (
					<TimelinePost accessToken={accessToken} />
				))}
			</Flex>
		);
	}
}

export default UserTimeline;
