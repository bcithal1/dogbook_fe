import { useGetOpenFriendRequests } from "@/queries/friend.queries";
import { useSession } from "next-auth/react";
import Loader from "../CustomComponents/Loader";
import { Box } from "@chakra-ui/react";
import { FriendRequestWithUser } from "@/types/friendship";

export const FriendNotification = () => {
  const { data: session } = useSession();
  const currentUserId = session?.user.id;
  const { data: friendRequest, isLoading: friendRequestsIsLoading } =
    useGetOpenFriendRequests(session?.accessToken);

if (friendRequestsIsLoading){
    return <Loader />
}

return (
    {friendRequest.map((frObject: FriendRequestWithUser) => {
        return (
          <div key={key}>
            <h2>{frObject.user.name}</h2>
            <p>{frObject.user.email}</p>
            {/* Add more details or actions here as needed */}
          </div>
        );
      })}
};

