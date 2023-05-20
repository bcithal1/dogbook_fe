import { User, UserProfile } from "@/types/user";
import UserTimeline from "../UserPage/UserTimeline";
import { Session } from "next-auth";
import userProfile from "@/pages/user-profile";
import React from "react";

interface PostNotificationProps {
  user: User;
  userProfile: UserProfile;
  session: Session;
}

export const PostNotification: React.FC<PostNotificationProps> = ({
  user,
  userProfile,
  session,
}) => {
  return (
    <UserTimeline user={user} userProfile={userProfile} session={session} />
  );
};
