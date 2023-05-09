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

export type DogFriendship = {
  id?: number;
  createDate: Date;
  primaryUserId: number;
  secondaryUserId: number;
};

export type DogFriendRequest = {
  id?: number;
  senderId: number;
  receiverId: number;
  createDate: Date;
};
