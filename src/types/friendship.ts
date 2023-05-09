export type Friendship = {
  id?: string;
  createDate: Date;
  primaryUserId: string;
  secondaryUserId: string;
};

export type FriendRequest = {
  id?: string;
  senderId: string;
  receiverId: string;
  createDate: Date;
};
