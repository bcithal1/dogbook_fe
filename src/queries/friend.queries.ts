import { getAxiosBackend } from "@/api/api";
import { useMutation, useQuery, UseQueryResult } from "@tanstack/react-query";
import { FriendRequest, Friendship } from "@/types/friendship";

export const useGetFriendList = (accessToken: string, userId: string) => {
  const backendAPI = getAxiosBackend(accessToken);
  return useQuery<Friendship[]>({
    queryKey: ["getFriendList", userId],
    queryFn: () => {
      return backendAPI.get(`/friendlist/${userId}`).then((response) => {
        return sortFriends(response.data, userId);
      });
    },
    enabled: !!accessToken,
  });

  function sortFriends(friendlist: Friendship[], userId: string) {
    friendlist.forEach((friendship: Friendship) => {
      if (friendship.primaryUserId != userId) {
        const tmp = friendship.secondaryUserId;
        friendship.secondaryUserId = friendship.primaryUserId;
        friendship.primaryUserId = tmp;
      }
    });
    return friendlist;
  }
};

export const useGetSentFriendRequests = (accessToken: string) => {
  const backendAPI = getAxiosBackend(accessToken);

  return useQuery({
    queryKey: ["getSentFriendRequests"],
    queryFn: async () =>
      (await backendAPI.get<FriendRequest[]>(`/friendrequest/sent`)).data,
    enabled: !!accessToken,
  });
};

export const useGetReceivedFriendRequests = (accessToken: string) => {
  const backendAPI = getAxiosBackend(accessToken);

  return useQuery({
    queryKey: ["getReceivedFriendRequests"],
    queryFn: async () =>
      (await backendAPI.get<FriendRequest[]>(`/friendrequest/received`)).data,
    enabled: !!accessToken,
  });
};

export const useRemoveFriend = (accessToken: string) => {
  const backendAPI = getAxiosBackend(accessToken);

  return useMutation(
    (friendshipId: string) =>
      backendAPI.delete<Friendship>(`/friendlist/${friendshipId}`),
    {
      onSuccess: (data) => {
        console.log("Friend request sent successfully", data);
      },
      onError: (error) => {
        console.error("Error sending friend request", error);
      },
    }
  );
};

export const useSendFriendRequest = (accessToken: string) => {
  const backendAPI = getAxiosBackend(accessToken);

  return useMutation(
    (userId: string) =>
      backendAPI.post<FriendRequest>(`/friendrequest/${userId}`),
    {
      onSuccess: (data) => {
        console.log("Friend request sent successfully", data);
      },
      onError: (error) => {
        console.error("Error sending friend request", error);
      },
    }
  );
};

export const useCancelFriendRequest = (accessToken: string) => {
  const backendAPI = getAxiosBackend(accessToken);

  return useMutation((requestId: string) =>
    backendAPI
      .delete<FriendRequest>(`/cancelrequest/${requestId}`)
      .then((response) => response.data)
  );
};

export const useAcceptFriendRequest = (accessToken: string) => {
  const backendAPI = getAxiosBackend(accessToken);

  return useMutation(
    (requestId: string) =>
      backendAPI.put<FriendRequest>(`/acceptfriendship/${requestId}`),
    {
      onError: (error) => {
        // Handle error
      },
    }
  );
};

export const useRejectFriendRequest = (accessToken: string) => {
  const backendAPI = getAxiosBackend(accessToken);

  return useMutation(
    (requestId: string) =>
      backendAPI.delete<FriendRequest>(`/rejectfriendship/${requestId}`),
    {
      onError: (error) => {
        // Handle error
      },
    }
  );
};
