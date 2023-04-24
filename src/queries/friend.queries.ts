import { getAxiosBackend } from "@/api/api";
import { useMutation, useQuery, UseQueryResult } from "@tanstack/react-query";
import { User } from "@/types/user";
import { FriendRequest, Friendship } from "@/types/friendship";
import { Dog } from "@/types/dog";
import { response } from "express";

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

export const useRemoveFriend = (accessToken: string, friendshipId: string) => {
  const backendAPI = getAxiosBackend(accessToken);

  return useQuery({
    queryKey: ["removeFriend", friendshipId],
    queryFn: async () =>
      (await backendAPI.delete<Friendship>(`/friendlist/${friendshipId}`)).data,
    enabled: !!accessToken,
  });
};

export const useSendFriendRequest = (accessToken: string, userId: string) => {
  const backendAPI = getAxiosBackend(accessToken);

  return useQuery({
    queryKey: ["sendFriendRequest", userId],
    queryFn: async () =>
      (await backendAPI.post<FriendRequest>(`/friendRequest/${userId}`)).data,
    enabled: !!accessToken,
  });
};

export const useGetSentFriendRequests = (accessToken: string) => {
  const backendAPI = getAxiosBackend(accessToken);

  return useQuery({
    queryKey: ["getSentFriendRequests"],
    queryFn: async () =>
      (await backendAPI.get<FriendRequest>(`/friendrequest/sent`)).data,
    enabled: !!accessToken,
  });
};

export const useGetReceivedFriendRequests = (accessToken: string) => {
  const backendAPI = getAxiosBackend(accessToken);

  return useQuery({
    queryKey: ["getReceivedFriendRequests"],
    queryFn: async () =>
      (await backendAPI.get<FriendRequest>(`/friendrequest/received`)).data,
    enabled: !!accessToken,
  });
};

export const useCancelFriendRequest = (
  accessToken: string,
  requestId: string
) => {
  const backendAPI = getAxiosBackend(accessToken);

  return useQuery({
    queryKey: ["cancelFriendRequest", requestId],
    queryFn: async () =>
      (await backendAPI.delete<FriendRequest>(`/cancelrequest/${requestId}`))
        .data,
    enabled: !!accessToken,
  });
};

export const useAccpetFriendRequest = (
  accessToken: string,
  requestId: string
) => {
  const backendAPI = getAxiosBackend(accessToken);

  return useQuery({
    queryKey: ["acceptFriendRequest", requestId],
    queryFn: async () =>
      (await backendAPI.delete<FriendRequest>(`/acceptfriendship/${requestId}`))
        .data,
    enabled: !!accessToken,
  });
};

export const useRejectFriendRequest = (
  accessToken: string,
  requestId: string
) => {
  const backendAPI = getAxiosBackend(accessToken);

  return useQuery({
    queryKey: ["acceptFriendRequest", requestId],
    queryFn: async () =>
      (await backendAPI.delete<FriendRequest>(`/rejectfriendship/${requestId}`))
        .data,
    enabled: !!accessToken,
  });
};
