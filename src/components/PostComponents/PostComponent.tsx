import { useState } from "react";
import {
  Avatar,
  Card,
  Heading,
  HStack,
  Spinner,
  Text,
  VStack,
} from "@chakra-ui/react";
import { Post } from "@/types/post";
import UserPostProfilePhoto from "./UserPostProfilePhoto";
import LikeButton from "./LikeButton";
import CommentButton from "./CommentButton";
import { useGetUserById, useGetUserProfile } from "@/queries/user.queries";
import { Session } from "next-auth";
import Loader from "../CustomComponents/Loader";

function Post({ session, post }: { session: Session; post: Post }) {
  const getAuthorInfo = useGetUserById(session?.accessToken, post.authorId);
  const getProfile = useGetUserProfile(session?.accessToken, post.authorId);

  if (getProfile.status === "loading") {
    return <Spinner />;
  }
  if (getAuthorInfo.status === "loading") {
    return <Spinner />;
  }
  if (getProfile.status === "success" && getAuthorInfo.status === "success") {
    const userProfile = getProfile.data;
    const author = getAuthorInfo.data;
    return (
      <Card
        size="lg"
        width={"md"}
        alignSelf="center"
        paddingTop={2}
        paddingBottom={2}
      >
        <HStack marginLeft={2}>
          <UserPostProfilePhoto
            photoId={userProfile.profilePhotoId}
            accessToken={session?.accessToken}
          />
          <VStack spacing={0.5}>
            <Heading marginTop={3} size={"sm"}>
              {author.displayName}
            </Heading>
            <Text>time</Text>
          </VStack>
        </HStack>

        <Text
          paddingTop={1}
          paddingLeft={2}
          paddingRight={2}
          textAlign="center"
        >
          {post.message}
        </Text>

        <HStack alignSelf={"center"} paddingTop={7}>
          {post.authorId === session?.user.id ? null : (
            <LikeButton
              post={post}
              user={author}
              accessToken={session?.accessToken}
            />
          )}
          <CommentButton
            post={post}
            user={author}
            accessToken={session?.accessToken}
            userProfile={userProfile}
          />
        </HStack>
      </Card>
    );
  }
}

interface PostNotificationCardProps {
  post: Post;
  session: Session;
}
export const PostNotificationCard: React.FC<PostNotificationCardProps> = ({
  post,
  session,
}) => {
  const getAuthorInfo = useGetUserById(session?.accessToken, post.authorId);
  const getProfile = useGetUserProfile(session?.accessToken, post.authorId);

  if (getProfile.status === "loading") {
    return <Loader />;
  }
  if (getAuthorInfo.status === "loading") {
    return <Loader />;
  }
  if (getProfile.status === "success" && getAuthorInfo.status === "success") {
    const userProfile = getProfile.data;
    const author = getAuthorInfo.data;
    return (
      <Card
        size="lg"
        width={"md"}
        alignSelf="center"
        paddingTop={2}
        paddingBottom={2}
      >
        <HStack marginLeft={2}>
          <UserPostProfilePhoto
            photoId={userProfile.profilePhotoId}
            accessToken={session?.accessToken}
          />
          <VStack spacing={0.5}>
            <Heading marginTop={3} size={"sm"}>
              {author.displayName}
            </Heading>
            <Text>time</Text>
          </VStack>
        </HStack>

        <Text
          paddingTop={1}
          paddingLeft={2}
          paddingRight={2}
          textAlign="center"
        >
          {post.message}
        </Text>

        <HStack alignSelf={"center"} paddingTop={7}>
          {post.authorId === session?.user.id ? null : (
            <LikeButton
              post={post}
              user={author}
              accessToken={session?.accessToken}
            />
          )}
          <CommentButton
            post={post}
            user={author}
            accessToken={session?.accessToken}
            userProfile={userProfile}
          />
        </HStack>
      </Card>
    );
  }
};

export default Post;
