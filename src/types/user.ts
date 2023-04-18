export type User = {

    id:number;
    fullName: string;
    displayName:string;
    email:string;
    address: string;
    phoneNumber:string;
    date_of_birth:string;
    gender:string;
    profilePhotoUrl:string
    eventUserRelations: eventUserRelation[];
    userChallengeRelations:userChallengeRelations[];

}

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