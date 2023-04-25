import {
  useAcceptFriendRequest,
  useCancelFriendRequest,
  useGetReceivedFriendRequests,
  useGetSentFriendRequests,
  useRejectFriendRequest,
  useRemoveFriend,
  useSendFriendRequest,
} from "@/queries/friend.queries";
import { FriendRequest, Friendship } from "@/types/friendship";
import {
  Button,
  Flex,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverTrigger,
  Spacer,
  Spinner,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { useCallback, useEffect, useState } from "react";
import { useSendFriendRequestButtonFunction } from "./ButtonFunctions";

export const FriendButton = ({ friends }: { friends: Friendship[] }) => {
  let buttonType: ButtonType;
  let relationId: string;

  const { data: session } = useSession();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const currentUserId: string = session?.user.id;
  const cardUserId: string = friends.at(0).primaryUserId;

  const sendRequestMutation = useSendFriendRequest(session?.accessToken);
  const cancelRequestMutation = useCancelFriendRequest(session?.accessToken);
  const acceptRequestMutation = useAcceptFriendRequest(session?.accessToken);
  const rejectRequestMutation = useRejectFriendRequest(session?.accessToken);
  const removeFriendMutation = useRemoveFriend(session?.accessToken);

  const { status: sentRequestStatus, data: sentRequest } =
    useGetSentFriendRequests(session?.accessToken);

  const { status: receivedRequestStatus, data: receivedRequest } =
    useGetReceivedFriendRequests(session?.accessToken);

  const handleCancel = () => {
    cancelRequestMutation.mutate(relationId);
  };

  const handleNewRequest = () => {
    try {
      sendRequestMutation.mutateAsync(relationId);
      buttonType = 2;
    } catch {}
  };

  const handleAcceptRequest = () => {
    try {
      acceptRequestMutation.mutateAsync(relationId);
    } catch {}
  };

  const handleRejectRequest = () => {
    try {
      rejectRequestMutation.mutateAsync(relationId);
    } catch {}
  };

  const handleRemoveFriend = () => {
    try {
      removeFriendMutation.mutateAsync(relationId);
    } catch {}
  };

  if (receivedRequestStatus === "loading" || sentRequestStatus === "loading") {
    return <Spinner>Page is Loading...</Spinner>;
  }

  if (friends.some((friend) => friend.secondaryUserId === currentUserId)) {
    buttonType = 0;
    relationId = friends.find(
      (friend) => friend.secondaryUserId === currentUserId
    ).id;
  } else if (sentRequest.some((request) => request.receiverId === cardUserId)) {
    buttonType = 1;
    relationId = sentRequest.find((req) => req.receiverId === cardUserId).id;
  } else if (
    receivedRequest.some((request) => request.senderId === cardUserId)
  ) {
    buttonType = 2;
    relationId = receivedRequest.find((req) => req.senderId === cardUserId).id;
  } else {
    buttonType = 3;
    relationId = cardUserId;
  }

  switch (buttonType) {
    case ButtonType.DELETE_FRIEND:
      return (
        <>
          <Button onClick={onOpen}>Remove Friend</Button>

          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Confirm Deletion</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Text>
                  Please confirm if you'd like to remove this user as a friend?
                  Would you like to take a minute to look at dog pictures and
                  reconsider?
                </Text>

                <Flex justifyContent="space-between" pt={8}>
                  <Button colorScheme="blue" onClick={handleRemoveFriend}>
                    Confirm
                  </Button>
                  <Button onClick={onClose}>Cancel</Button>
                  <Button onClick={onClose}>ROUTE_TO_DOGS</Button>
                </Flex>
              </ModalBody>
            </ModalContent>
          </Modal>
        </>
      );

    case ButtonType.REQUEST_CANCEL:
      return <Button onClick={() => handleCancel()}>Cancel Request</Button>;

    case ButtonType.REQUEST_RESPOND:
      return (
        <Popover>
          <PopoverTrigger>
            <Button>Respond</Button>
          </PopoverTrigger>
          <PopoverContent>
            <PopoverBody>
              <Flex justifyContent="space-between">
                <Button
                  colorScheme="whatsapp"
                  onClick={() => handleAcceptRequest}
                >
                  Accept Request
                </Button>
                <Button colorScheme="red" onClick={() => handleRejectRequest}>
                  Reject Request
                </Button>
              </Flex>
            </PopoverBody>
          </PopoverContent>
        </Popover>
      );

    default:
      return <Button onClick={handleNewRequest}>Add Friend</Button>;
  }
};

enum ButtonType {
  DELETE_FRIEND,
  REQUEST_CANCEL,
  REQUEST_RESPOND,
  REQUEST_SEND,
}
