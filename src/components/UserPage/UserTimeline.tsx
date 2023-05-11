import { getAllPostsByCurrentUser } from "@/queries/post.queries";
import { Flex } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import React from "react";
import UserSideBar from "./UserSideBar";


function UserTimeline() {
  const { data: session } = useSession();
  const { postStatus, postData } = getAllPostsByCurrentUser(
    session?.accessToken
  );
  
  if (postStatus === "loading") {
    return <>is loading</>;
  }

  if (postStatus === "error") {
    return <>error calling apis</>;
  }
  return (

    <Flex flexDirection={"column"} width="69%" mt={"1em"}>
      {postData.map((post) => (
        <UserSideBar post={post} key={post.postId} />
      ))}
    </Flex>
  );
}

export default UserTimeline;