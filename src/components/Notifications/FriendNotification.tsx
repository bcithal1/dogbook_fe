<<<<<<< HEAD
// import {
//   useGetFriendList,
//   useGetOpenFriendRequests,
// } from "@/queries/friend.queries";
=======
import {
  useGetFriendList,
  useGetSentFriendRequests,
} from "@/queries/friend.queries";
>>>>>>> main

// import { useSession } from "next-auth/react";
// import Loader from "../CustomComponents/Loader";
// import { useRouter } from "next/router";
// import { FriendButton } from "../Friends/FriendButton";

// function FriendNotification() {
//   const { data: session } = useSession();
//   const router = useRouter();

  const { isLoading: friendListIsLoading, data: friendList } =
    useGetSentFriendRequests(session?.accessToken);

//   if (friendListIsLoading) {
//     return <Loader />;
//   }
//   return <></>;
// }

// export default FriendNotification;
