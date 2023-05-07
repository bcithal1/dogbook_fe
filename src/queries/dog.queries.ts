import { getAxiosBackend } from "@/api/api";
import { Dog } from "@/types/dog";
import { Breed } from "@/types/breed";
import { useMutation, useQuery } from "@tanstack/react-query";
import { User } from "@/types/user";
import { useState } from "react";

export const useCreateDog = (accessToken: string) => {
  const backendAPI = getAxiosBackend(accessToken);

  return useMutation((dog: Dog) => backendAPI.post<Dog>(`/dogs`, dog), {
    onError: (error) => {
      throw error;
    },
  });
};

export const useGetDogById = (accessToken: string, id: Dog["id"]) => {
  const backendAPI = getAxiosBackend(accessToken);
  return useQuery<Dog>({
    queryKey: ["getDogById", id],
    queryFn: () => {
      return backendAPI.get(`/dogs/${id}`).then((response) => {
        return response.data;
      });
    },
    enabled: !!accessToken,
  });
};

export const useGetBreedList = (accessToken: string) => {
  const backendAPI = getAxiosBackend(accessToken);
  return useQuery<Breed[]>({
    queryKey: ["breeds"],
    queryFn: () => {
      return backendAPI.get(`/breeds`).then((response) => {
        return response.data;
      });
    },
    enabled: !!accessToken,
  });
};

export const useUploadDogPhoto = (accessToken: string) => {
  const backendAPI = getAxiosBackend(accessToken);

  return useMutation(
    ({ dogId, file }: { dogId: number; file: any }) => {
      const formData = new FormData();
      formData.append("file", file);
      return backendAPI.post(`/dogs/${dogId}/photos`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    },
    {
      onError: (error) => {
        throw error;
      },
    }
  );
};

export const useGetDogPhoto = (accessToken: string, id: number) => {
  const backendAPI = getAxiosBackend(accessToken);
  return useQuery<string>({
    queryKey: ["getDogPhoto", id],
    queryFn: () => {
      return backendAPI.get(`/photos/${id}`).then((response) => {
        return response.data;
      });
    },
    enabled: !!accessToken,
  });
};

export const useGetDogProfilePhoto = (accessToken: string, dogId: number) => {
  const backendAPI = getAxiosBackend(accessToken);
  return useQuery<string>({
    queryKey: ["getDogProfilePhoto", dogId],
    queryFn: () => {
      return backendAPI
        .get(`/dogs/profile/picture/${dogId}`)
        .then((response) => {
          return response.data;
        });
    },
    enabled: !!accessToken,
  });
};

export const useGetDogByOwnerId = (accessToken: string, id: User["id"]) => {
  const backendAPI = getAxiosBackend(accessToken);
  return useQuery<Dog[]>({
    queryKey: ["getDogByOwnerId", id],
    queryFn: () => {
      return backendAPI.get(`/dogs?ownerId=${id}`).then((response) => {
        return response.data;
      });
    },
    enabled: !!accessToken,
  });
};
