import { getAxiosBackend } from "@/api/api";
import { useMutation, useQuery } from "@tanstack/react-query";
import { User } from "@/types/user";

export const useUpdateProfile = (accessToken: string) => {
    const backendAPI = getAxiosBackend(accessToken);
    
    return useMutation((user: User) => backendAPI.put<User>(`/users/${user.id}`, user),
        {
            onError: (error) => {
                throw error;
            }
        }
    );
};

export const useGetUserInfo = (accessToken: string, userId: string) => {
  const backendAPI = getAxiosBackend(accessToken);

  return useQuery({
    queryKey: ["users", userId],
    queryFn: async () => (await backendAPI.get<User>(`/users/${userId}`)).data,
    enabled: !!accessToken
  });
}

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

export function getAllUser(accessToken: string){
    const backendAPI = getAxiosBackend(accessToken);
    const {status, data} = useQuery({
        queryKey: ["getAllUser"],
        queryFn: ()=>{
            return backendAPI.get<User[]>(`/users`).then((res)=>res.data)
        },
        // make the query wait for accesstoken, !! is a short hand. !!accessToken turn it into a boolean
        enabled:!!accessToken

    })
    return {status, data}
}