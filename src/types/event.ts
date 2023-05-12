export type Event = {

    eventId:number;
    hostId: number;
    eventTitle:string;
    eventLocation:string;
    eventDescription: string;
    date:string;
    time:string;
    lat:number;
    lng:number;
    eventUserRelations: eventUserRelation[];

}

type eventUserRelation = {
    id: number;
    eventaccessLevel:string;
    goingStatus:string;
    eventInvitedStatus:string;
}

