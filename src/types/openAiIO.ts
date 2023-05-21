export type openAiCompletionInput = {
    model: string,
    messages: message[],
    temperature: number
}

type message = {
    role: string,
    content: string
}


export type openAiCompletionResponse = {
    id: string,
    object:string,
    created:number,
    model: string,
    usage: usage,
    choices:choice[]

}


type usage = {
    prompt_tokens:number,
    completion_tokens:number,
    total_tokens:number
}


type choice = {
    message:message,
    finish_reason: string,
    index:number
}
