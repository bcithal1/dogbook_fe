export type User = {
  id: number;
  fullName: string;
  displayName?: string;
  email: string;
  phoneNumber?: string;
  date_of_birth?: number[];
  gender?: string;
  profilePhotoUrl: string;
};

export type userProfile = {
  id: number;
  aboutSection: string;
  profilePhotoId: number;
  bannerPhotoId: number;
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
