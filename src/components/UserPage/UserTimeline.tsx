import { getAllPostsByCurrentUser } from "@/queries/post.queries";
import { Flex, HStack, Stack, VStack } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import React from "react";
import UserSideBar from "./UserSideBar";

import { User, UserProfile } from "@/types/user";
import index from "@/pages";
import PostComponent from "../PostComponents/PostComponent";
import { Session } from "next-auth";

function UserTimeline({
	session,
	user,
	userProfile,
}: {
	session: Session;
	user: User;
	userProfile: UserProfile;
}) {
	const { status: postStatus, data: postData } = getAllPostsByCurrentUser(
		session?.accessToken,
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
				{postData.map((post) =>
					post.commentId ? null : (
						<>
							<PostComponent session={session} post={post} />
						</>
					)
				)}
			</Stack>
		);
	}
}

export default UserTimeline;
