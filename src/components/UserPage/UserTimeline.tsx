import { getAllPostsByCurrentUser } from "@/queries/post.queries";
import { Flex, HStack, Stack, VStack } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import React from "react";
import UserSideBar from "./UserSideBar";

import { User, UserProfile } from "@/types/user";
import Post from "../PostComponents/Post";
import index from "@/pages";

function UserTimeline({
	accessToken,
	user,
	userProfile,
}: {
	accessToken: string;
	user: User;
	userProfile: UserProfile;
}) {
	const { status: postStatus, data: postData } = getAllPostsByCurrentUser(
		accessToken,
		user?.id
	);

	if (postStatus === "loading") {
		return <>is loading</>;
	}

	if (postStatus === "error") {
		return <>error calling apis</>;
	}

	if (postStatus === "success") {
		postData.sort(function (x, y) {
			return y.postId - x.postId;
		});

		return (
			<Stack>
				{postData.map((post) => (
					<Post
						accessToken={accessToken}
						user={user}
						userProfile={userProfile}
						post={post}
					/>
				))}
			</Stack>
		);
	}
}

export default UserTimeline;
