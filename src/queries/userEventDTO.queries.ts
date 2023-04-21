import { getAxiosBackend } from "@/api/api";
import { UserEventDTO } from "@/types/userEventDTO";
import { useQueries, useQuery } from "@tanstack/react-query";

export function getUserEventDto(accessToken:string, userId: number, eventId: number){

    const backendAPI = getAxiosBackend(accessToken);
    const{status, data} = useQuery({
        queryKey:[`eventid${eventId}userId${userId}`],
        queryFn: ()=>{
            return backendAPI.get<UserEventDTO>(`/eventUserMapper/${eventId}/${userId}`).then((res)=>res.data)
        }
    })
    let DTOstatus = status;
    let DTOdata = data
    return {DTOstatus, DTOdata}

}