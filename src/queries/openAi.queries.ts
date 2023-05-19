import { openAiApi } from "@/api/api";
import { openAiCompletionInput, openAiCompletionResponse } from "@/types/openAiIO";
import { useMutation } from "@tanstack/react-query";


export function openAiCompletion(){

    return useMutation({
        mutationFn:(body:openAiCompletionInput)=>{
            return openAiApi.post<openAiCompletionResponse>("/v1/chat/completions",body).then((res)=>res.data)
        }
    })

}