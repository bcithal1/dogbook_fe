export type User = {
  id: string;
  fullName: string;
  displayName?: string;
  email: string;
  phoneNumber?: string;
  date_of_birth?: number[];
  gender?: string;
  profilePhotoUrl: string;
  eventUserRelations: eventUserRelation[];
  userChallengeRelations:userChallengeRelations[];
};

type eventUserRelation = {
    id: number;
    eventaccessLevel:string;
    goingStatus:string;
    eventInvitedStatus:string;
}

type userChallengeRelations ={
    Id:number;
    statusCode: string;
    completeDate: string;
}
