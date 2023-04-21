import { getAxiosBackend } from "@/api/api";
import { User } from "@/types/user";
import { useQuery } from "@tanstack/react-query";

export function getUserById(accessToken: string, userId: number){
    const backendAPI = getAxiosBackend(accessToken);
    const {status, data} = useQuery({
        queryKey: [userId],
        queryFn: ()=>{
            return backendAPI.get<User>(`/users/${userId}`).then((res)=>res.data)
        },
        // make the query wait for accesstoken, !! is a short hand. !!accessToken turn it into a boolean
        enabled:!!accessToken

    })
    return {status, data}
}