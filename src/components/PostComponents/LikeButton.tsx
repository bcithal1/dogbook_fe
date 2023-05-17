import {
	useDeleteLike,
	useGetLikedPostsByCurrentUser,
	useLikePost,
} from "@/queries/post.queries";
import { Post, UserLikedPost } from "@/types/post";
import { User } from "@/types/user";
import { filter, Spinner } from "@chakra-ui/react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { FaPaw } from "react-icons/fa";

function LikeButton({
	post,
	accessToken,
	user,
}: {
	post: Post;
	accessToken: string;
	user: User;
}) {
	const getLikedPosts = useGetLikedPostsByCurrentUser(accessToken);
	const likePost = useLikePost(accessToken);
	const unLikePost = useDeleteLike(accessToken);
	const queryClient = useQueryClient();
	const [liked, setLiked] = useState(false);

	useEffect(() => {
		if (getLikedPosts.isSuccess) {
			if (
				findLikedPosts(getLikedPosts.data) != null &&
				findLikedPosts(getLikedPosts.data) != undefined
			) {
				setLiked(true);
			} else {
				setLiked(false);
			}
		}
	}, [useGetLikedPostsByCurrentUser(accessToken).isSuccess]);

	useEffect(() => {
		if (likePost.isSuccess) {
			console.log("liked");
			setLiked(true);
		}
	}, [likePost.isSuccess]);

	useEffect(() => {
		if (unLikePost.isSuccess) {
			setLiked(false);
		}
	}, [unLikePost.isSuccess]);

	function handleClick() {
		if (liked === false) {
			likePost.mutate(post.postId);
		}
		if (liked === true) {
			unLikePost.mutate(post.postId);
		}
	}

	if (getLikedPosts.status === "error") {
		console.log("error");
	}

	if (getLikedPosts.status === "loading") {
		return <Spinner />;
	}
	function findLikedPosts(likedPosts: UserLikedPost[]) {
		const likedPost = likedPosts.find(
			(newPost) => newPost.postId === post.postId
		);
		return likedPost?.postId;
	}

	if (getLikedPosts.status === "success") {
		return (
			<button className="like-button" onClick={handleClick}>
				<div className="container" id="like-icon">
					{liked ? <FaPaw color="#ffbcda" /> : <FaPaw />}

					<span className="like">Like</span>
				</div>
			</button>
		);
	}
}
export default LikeButton;
