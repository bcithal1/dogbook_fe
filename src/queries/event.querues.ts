import { getAxiosBackend } from "@/api/api";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Event } from "@/types/event";

export function createEvent(accessToken: string){
    const backendAPI = getAxiosBackend(accessToken);
    return useMutation({mutationFn:(event:Event)=>{
        return backendAPI.post<Event>("/event", event).then((res)=>res.data)
    }})
}

export function getAllEvent(accessToken: string){
    const backendAPI = getAxiosBackend(accessToken);
    const {status, data} = useQuery({
        queryKey: ["getallevents"],
        queryFn: ()=>{
            return backendAPI.get<Event[]>("/event").then((res)=>res.data)
        },
        // make the query wait for accesstoken, !! is a short hand. !!accessToken turn it into a boolean
        enabled:!!accessToken

    })
    return {status, data}
}