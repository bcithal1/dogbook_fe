import {
	Box,
	Button,
	Textarea,
} from "@chakra-ui/react";
import { useState } from "react";
import React from "react";
import { useSession } from "next-auth/react";
import { useCreatePost } from "@/queries/post.queries";
import { Post } from "@/types/post";
import { FaPaw } from 'react-icons/fa';

function CreatePostForm() {
	const { data: session } = useSession();
	const createPostMutation = useCreatePost(session?.accessToken);
	const [message, setMessage] = useState<Post["message"] | null>(null);

	async function handleClick() {
		const post: Post = {
			message,
			postId: 0,
			authorId: 0,
			likeCount: 0,
			commentCount: 0,
			dateTime: undefined
		};

		console.log(post);
		try { createPostMutation.mutateAsync(post);
		} catch {}
	}

	return (
        <Box sx={{ maxWidth: 500}} mx="auto">
            <form>
                <Textarea
				onChange={(event) => {
				setMessage(event.target.value as Post["message"]);
				}}
				width={'400px'}
                focusBorderColor = "#886E58"
                borderRadius={'20px'}
                borderColor={'#978576'}
                borderWidth={'3px'}
                placeholder="What's on your mind..." />
                <Button className="button-74" type="submit" onClick={handleClick}><div id="paw"><FaPaw/></div><div className="post">Post</div></Button>
            </form>
        </Box>
	);
}

export default CreatePostForm;

