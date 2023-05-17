import { getAxiosBackend } from "@/api/api";
import { Challenge } from "@/types/challenges";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

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


export function assignChallengToUser(accessToken:string){
    const backendAPI = getAxiosBackend(accessToken);
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn:(values:{challengeId:number, userId: number})=>{
            return backendAPI.put<Challenge>(`/challenges/assign/${values.challengeId}/${values.userId}`).then((res)=>res.data)
        },

        onSuccess:(data)=>{
            queryClient.invalidateQueries()
        }

    })
};

export function getAllChallenges(accessToken:string){
    const backendAPI = getAxiosBackend(accessToken);
    const queryClient = useQueryClient()
    const {status, data} = useQuery({
        queryKey:["getAllChallenges"],
        queryFn: ()=>{
            return backendAPI.get<Challenge[]>('/challenges').then((res)=>res.data)
        },

        onSuccess: (data)=>{
            queryClient.invalidateQueries()
        }
    })
}


export function getChallengesById(accessToken:string, challengeId:number){
    const backendAPI = getAxiosBackend(accessToken);
    const queryClient = useQueryClient()
    const {status, data} = useQuery({
        queryKey:["getAllChallenges"],
        queryFn: ()=>{
            return backendAPI.get<Challenge>(`/challenges/${challengeId}`).then((res)=>res.data)
        },

        onSuccess: (data)=>{
            queryClient.invalidateQueries()
        }
    })

    return {status, data}
}


export function getChallengesByEventId(accessToken:string, eventId:number){
    const backendAPI = getAxiosBackend(accessToken);
    const queryClient = useQueryClient()
    const {status, data} = useQuery({
        queryKey:["getAllChallengesByEventId"],
        queryFn: ()=>{
            return backendAPI.get<Challenge[]>(`/challenges/eventId/${eventId}`).then((res)=>res.data)
        },

        onSuccess: (data)=>{
            queryClient.invalidateQueries()
        }
    })

    return {status, data}
}

