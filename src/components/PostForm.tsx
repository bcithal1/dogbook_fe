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
			message
		};

		console.log(post);
		try {
		} catch {}
	}

	const animateButton = (e: Event): void => {
		e.preventDefault();
		// reset animation
		(e.target as HTMLElement).classList.remove('animate');
	  
		(e.target as HTMLElement).classList.add('animate');
		setTimeout(() => {
		  (e.target as HTMLElement).classList.remove('animate');
		}, 700);
	  };
	  
	  const bubblyButtons = document.getElementsByClassName("bubbly-button");
	  
	  for (let i = 0; i < bubblyButtons.length; i++) {
		bubblyButtons[i].addEventListener('click', animateButton, false);
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

