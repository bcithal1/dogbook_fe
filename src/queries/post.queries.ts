import { getAxiosBackend } from "@/api/api";
import { Post } from "@/types/post";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useCreatePost = (accessToken: string) => {
  const backendAPI = getAxiosBackend(accessToken);

  return useMutation((post: Post) => backendAPI.post<Post>(`/posts`, post), {
    onError: (error) => {
      throw error;
    },
  });
};
