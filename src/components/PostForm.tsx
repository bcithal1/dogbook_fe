import { Box, Button, Textarea } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import React from "react";
import { useSession } from "next-auth/react";
import { useCreatePost } from "@/queries/post.queries";
import { Post } from "@/types/post";
import { FaPaw } from "react-icons/fa";
import { useGetFriendList } from "@/queries/friend.queries";

function CreatePostForm() {
  const { data: session } = useSession();
  const userFriends = useGetFriendList(session?.accessToken, "2");
  const createPostMutation = useCreatePost(session?.accessToken);
  const [message, setMessage] = useState<Post["message"] | null>(null);
  const [searchTerm, setSearchTerm] = useState<string | null>(null);
  const [isTagging, setIsTagging] = useState<boolean>(false);

  useEffect(() => {
    if (searchTerm) {
      console.log(searchTerm);
    }
  }, [searchTerm]);

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = event.target.value as Post["message"];
    setMessage(value);

    if (value.charAt(value.length - 1) === "@") {
      // if the last character is '@', set the searchTerm state to be empty and setIsTagging to true
      setSearchTerm("");
      setIsTagging(true);
    } else if (isTagging) {
      if (value.charAt(value.length - 1) === " ") {
        // if the last character is ' ', set the setIsTagging to false
        setIsTagging(false);
      } else {
        // if isTagging is true, append the new character to searchTerm
        setSearchTerm(
          (prevSearchTerm) => prevSearchTerm + value.charAt(value.length - 1)
        );
      }
    }
  };

  async function handleClick(event: React.FormEvent) {
    event.preventDefault();

    const post: Post = {
      message,
    };

    try {
      createPostMutation.mutateAsync(post);
    } catch {}
  }

  return (
    <Box sx={{ maxWidth: 500 }} mx="auto">
      <form onSubmit={handleClick}>
        <Textarea
          onChange={(event) => {
            handleChange(event);
          }}
          width={"400px"}
          focusBorderColor="#886E58"
          borderRadius={"20px"}
          borderColor={"#978576"}
          borderWidth={"3px"}
          placeholder="What's on your mind..."
        />
        <Button className="button-74" type="submit">
          <div id="paw">
            <FaPaw />
          </div>
          <div className="post">Post</div>
        </Button>
      </form>
    </Box>
  );
}

export default CreatePostForm;
