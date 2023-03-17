import { getAxiosBackend } from "@/api/api";
import { Dog } from "@/types/dog";
import { useMutation } from "@tanstack/react-query";

export const useCreateDog = (accessToken: string) => {
    const backendAPI = getAxiosBackend(accessToken);
    
    return useMutation((dog: Dog) => backendAPI.post(`/dogs`, dog),
        {
            onError: (error) => {
                throw error;
            }
        }
    );
};