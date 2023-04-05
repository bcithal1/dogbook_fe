import { getAxiosBackend } from "@/api/api";
import { Dog } from "@/types/dog";
import { useMutation } from "@tanstack/react-query";

export const useCreateDog = (accessToken: string) => {
    const backendAPI = getAxiosBackend(accessToken);
    
    return useMutation((dog: Dog) => backendAPI.post<Dog>(`/dogs`, dog),
        {
            onError: (error) => {
                throw error;
            }
        }
    );
};

export const useUploadDogPhoto = (accessToken: string) => {
    const backendAPI = getAxiosBackend(accessToken);

    return useMutation(({dogId, file}: {dogId: number, file: any}) => {
            const formData = new FormData();
            formData.append('file', file);
            return backendAPI.post(`/dogs/${dogId}/photos`, formData, { headers: { "Content-Type": "multipart/form-data" } });
        },
        {
            onError: (error) => {
             throw error;
            }
        }
    );
};