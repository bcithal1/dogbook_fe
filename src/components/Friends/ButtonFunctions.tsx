import { useSendFriendRequest } from "@/queries/friend.queries";
import { useCallback } from "react";

export function useSendFriendRequestButtonFunction() {
  const sendRequest = useCallback((token: string, userId: string) => {
    const shipRequest = useSendFriendRequest(token, userId);
  }, []);

  return sendRequest;
}
