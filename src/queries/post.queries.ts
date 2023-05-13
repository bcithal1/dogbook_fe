import { getAxiosBackend } from "@/api/api";
import { Post } from "@/types/post";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useCreatePost = (accessToken: string) => {
  const backendAPI = getAxiosBackend(accessToken);

  return useMutation((post: Post) => backendAPI.post<Post>(`/posts`, post), {
    onError: (error) => {
      throw error;
    },
  });
};

export function useCreateComment(accessToken: string) {
  const backendAPI = getAxiosBackend(accessToken);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (value: { postId: number; post: Post }) => {
      return backendAPI
        .put<Event>(`/event/invite/${value.postId}`)
        .then((res) => res.data);
    },

    onSuccess: (data) => {
      queryClient.invalidateQueries();
    },
  });
}

export function useGetAllPosts(accessToken: string) {
  const backendAPI = getAxiosBackend(accessToken);
  return useQuery<Post[]>({
    queryKey: ["useGetAllPosts"],
    queryFn: () => {
      return backendAPI.get("/posts").then((response) => {
        return response.data;
      });
    },
    enabled: !!accessToken,
  });
}

export function getAllPostsByCurrentUser(
  accessToken: string,
  currentUser: string
) {
  const backendAPI = getAxiosBackend(accessToken);
  return useQuery<Post[]>({
    queryKey: ["getAllPostsByCurrentUser", currentUser],
    queryFn: () => {
      return backendAPI.get<Post[]>(`/posts/user/6`).then((res) => res.data);
    },
    enabled: !!accessToken,
  });
}
