import { getAxiosBackend } from "@/api/api";
import { useMutation, useQuery } from "@tanstack/react-query";
import { User } from "@/types/user";

export const useUpdateProfile = (accessToken: string) => {
    const backendAPI = getAxiosBackend(accessToken);
    
    return useMutation((user: User) => backendAPI.put<User>(`/users/${user.id}`, user),
        {
            onError: (error) => {
                throw error;
            }
        }
    );
};

export const useGetUserInfo = (accessToken: string, userId: string) => {
  const backendAPI = getAxiosBackend(accessToken);

  return useQuery({
    queryKey: ["users", userId],
    queryFn: async () => (await backendAPI.get<User>(`/users/${userId}`)).data,
    enabled: !!accessToken
  });
}