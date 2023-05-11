import { getAxiosBackend } from "@/api/api";
import { Post } from "@/types/post";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useCreatePost = (accessToken: string) => {
    const backendAPI = getAxiosBackend(accessToken);
    
    return useMutation(
        (post: Post) => 
            backendAPI.post<Post>(`/posts`, post),
        {
            onError: (error) => {
                throw error;
            }
        }
    );
};

export function useCreateComment(accessToken: string){
    const backendAPI = getAxiosBackend(accessToken);
    const queryClient = useQueryClient()
    return useMutation({mutationFn:(value:{postId: number, post: Post})=>{
        return backendAPI.put<Event>(`/event/invite/${value.postId}`).then((res)=>res.data)
    },

    onSuccess:(data)=>{
        queryClient.invalidateQueries()
    }
})
}

export function getAllPostsByCurrentUser(accessToken: string){
    const backendAPI = getAxiosBackend(accessToken);
    const {status, data} = useQuery({
        queryKey: ["getAllPostsByCurrentUser"],
        queryFn: ()=>{
            return backendAPI.get<Post[]>("/post/currentUser").then((res)=>res.data)
        },
        // make the query wait for accesstoken, !! is a short hand. !!accessToken turn it into a boolean
        enabled:!!accessToken

    })
    let postData = data
    let postStatus = status
    return {postStatus, postData}
}