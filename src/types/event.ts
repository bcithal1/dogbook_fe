export type Event = {

    eventId:number;
    hostId: number;
    eventTitle:string;
    eventLocation:string;
    eventDescription: string;
    date:string;
    eventUserRelations: eventUserRelation[];

}

type eventUserRelation = {
    id: number;
    eventaccessLevel:string;
    goingStatus:string;
    eventInvitedStatus:string;
}