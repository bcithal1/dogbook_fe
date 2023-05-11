export type User = {
  id: string;
  fullName: string;
  displayName?: string;
  email: string;
  phoneNumber?: string;
  date_of_birth?: number[];
  profilePhotoUrl: string;
};

export type UserProfile = {
  id: string;
  aboutSection: string;
  profilePhotoId: string;
  bannerPhotoId: string;
};

type eventUserRelation = {
  id: number;
  eventaccessLevel: string;
  goingStatus: string;
  eventInvitedStatus: string;
};

type userChallengeRelations = {
  Id: number;
  statusCode: string;
  completeDate: string;
};
