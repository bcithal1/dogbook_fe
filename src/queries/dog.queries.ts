import { getAxiosBackend } from "@/api/api";
import { Dog } from "@/types/dog";
import { Breed } from "@/types/breed";
import { useMutation, useQuery } from "@tanstack/react-query";

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

export function useGetBreedList(accessToken: string) {
    const backendAPI = getAxiosBackend(accessToken);
    return useQuery<Breed[]>({
        queryKey: ["breeds"],
        queryFn: () => {
            return backendAPI.get(`/breeds`).then((response => {
                return response.data
            }))
        },enabled:!!accessToken
    })
}

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