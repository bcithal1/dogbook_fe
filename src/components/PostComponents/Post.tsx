import { useState } from "react";
import { Avatar, Heading, HStack, Text } from "@chakra-ui/react";
import { FaPaw, FaRegCommentAlt } from "react-icons/fa";
import { useSession } from "next-auth/react";
import { UserProfilePhoto } from "../UserPage/UserProfilePhoto";
import { useCreatePost } from "@/queries/post.queries";
import { Post } from "@/types/post";
import router from "next/router";
import { User, UserProfile } from "@/types/user";
import UserPostProfilePhoto from "./UserPostProfilePhoto";

function TimelinePost({
	accessToken,
	user,
	userProfile,
	post,
}: {
	accessToken: string;
	user: User;
	userProfile: UserProfile;
	post: Post;
}) {
	const createPostMutation = useCreatePost(accessToken);
	const [showComments, setShowComments] = useState(false);
	const [message, setMessage] = useState<Post["message"] | null>(null);
	const [likeCount, setLikeCount] = useState<Post["likeCount"] | null>(null);
	const [commentId, setCommentId] = useState<Post["commentId"] | null>(null);

	const toggleComments = () => {
		setShowComments(!showComments);
	};

	async function handleClick() {
		const post: Post = {
			message,
			commentId,
			postId: 0,
			authorId: 0,
			likeCount,
			commentCount: 0,
			dateTime: undefined,
		};

		console.log(post);
		try {
			createPostMutation.mutateAsync(post);
		} catch {}
	}

	return (
		<center>
			<div className="card">
				<div className="comments">
					<div className="comment-react"></div>
					<div className="comment-container">
						<div className="user">
							<HStack marginTop={-4} marginBottom={-5}>
								<UserPostProfilePhoto
									photoId={userProfile.profilePhotoId}
									accessToken={accessToken}
								/>
								<Heading marginTop={3} size={"sm"}>
									{user.displayName}
								</Heading>
								<Text>time</Text>
							</HStack>
						</div>
						<p className="timeline-content">{post.message}</p>
					</div>
				</div>
				{showComments && (
					<>
						<div className="text-box">
							<div className="box-container">
								<form>
									<textarea
										onChange={(event) => {
											setMessage(event.target.value as Post["message"]);
										}}
										placeholder="Reply"
										value={commentId}
										// onChange={handleCommentChange}
									></textarea>
									<button type="submit">Submit</button>
								</form>
							</div>
						</div>
					</>
				)}

				<button className="like-button">
					<div className="container" id="like-icon">
						<span className="like-paw">
							<FaPaw />
						</span>
						<span className="like">Like</span>
					</div>
				</button>
				<button className="comment-button" onClick={toggleComments}>
					<div className="container" id="comment-icon">
						<span className="comment-alt">
							<FaRegCommentAlt />
						</span>
						<span className="text">Comment</span>
					</div>
				</button>
			</div>
		</center>
	);
}

export default TimelinePost;
