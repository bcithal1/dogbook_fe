import {
  useAcceptFriendRequest,
  useCancelFriendRequest,
  useGetReceivedFriendRequests,
  useGetSentFriendRequests,
  useRejectFriendRequest,
  useRemoveFriend,
  useSendFriendRequest,
} from "@/queries/friend.queries";
import { Friendship } from "@/types/friendship";
import {
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { useState } from "react";
import Loader from "../CustomComponents/Loader";

export const FriendButton = ({ friends }: { friends: Friendship[] }) => {
  const [buttonType, setButtonType] = useState<ButtonType>();
  const [relationId, setRelationId] = useState<string>();

  const { data: session } = useSession();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const currentUserId: string = session?.user.id;
  const cardUserId: string = friends.at(0).primaryUserId;

  const sendRequestMutation = useSendFriendRequest(
    session?.accessToken,
    setRelationId
  );
  const acceptRequestMutation = useAcceptFriendRequest(
    session?.accessToken,
    setRelationId
  );
  const cancelRequestMutation = useCancelFriendRequest(session?.accessToken);
  const rejectRequestMutation = useRejectFriendRequest(session?.accessToken);
  const removeFriendMutation = useRemoveFriend(session?.accessToken);

  const { data: sentRequest, isLoading: isSentRequestLoading } =
    useGetSentFriendRequests(session?.accessToken);
  const { data: receivedRequest, isLoading: isReceivedRequestLoading } =
    useGetReceivedFriendRequests(session?.accessToken);

  if (isSentRequestLoading || isReceivedRequestLoading) {
    return <Loader />;
  }

  const handleCancel = () => {
    cancelRequestMutation.mutate(relationId);
    setRelationId(cardUserId);
    setButtonType(3);
  };

  const handleNewRequest = () => {
    try {
      sendRequestMutation.mutateAsync(relationId);
      setButtonType(1);
    } catch {}
  };

  const handleAcceptRequest = () => {
    try {
      acceptRequestMutation.mutateAsync(relationId);
      setButtonType(0);
    } catch {}
  };

  const handleRejectRequest = () => {
    try {
      rejectRequestMutation.mutateAsync(relationId);
      setRelationId(cardUserId);
      setButtonType(3);
    } catch {}
  };

  const handleRemoveFriend = () => {
    try {
      removeFriendMutation.mutateAsync(relationId);
      setRelationId(cardUserId);
      setButtonType(3);
    } catch {}
  };

  if (buttonType == undefined || relationId == undefined) {
    if (friends.some((friend) => friend.secondaryUserId === currentUserId)) {
      setButtonType(0);
      setRelationId(
        friends.find((friend) => friend.secondaryUserId === currentUserId).id
      );
    } else if (
      sentRequest.some((request) => request.receiverId === cardUserId)
    ) {
      setButtonType(1);
      setRelationId(
        sentRequest.find((req) => req.receiverId === cardUserId).id
      );
    } else if (
      receivedRequest.some((request) => request.senderId === cardUserId)
    ) {
      setButtonType(2);
      setRelationId(
        receivedRequest.find((req) => req.senderId === cardUserId).id
      );
    } else {
      setButtonType(3);
      setRelationId(cardUserId);
    }
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
                <Button colorScheme="whatsapp" onClick={handleAcceptRequest}>
                  Accept Request
                </Button>
                <Button colorScheme="red" onClick={handleRejectRequest}>
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
