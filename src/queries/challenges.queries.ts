import { getAxiosBackend } from "@/api/api";
import { Challenge } from "@/types/challenges";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useCreateChallenges(accessToken:string){
    const backendAPI = getAxiosBackend(accessToken);
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn:(challenge:Challenge)=>{
            return backendAPI.post<Challenge>(`/challenges`, challenge).then((res)=>res.data)
        },

        onSuccess:(data)=>{
            queryClient.invalidateQueries()
        }

    })
  };