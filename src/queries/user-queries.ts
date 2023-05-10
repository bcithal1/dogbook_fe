import { getAxiosBackend } from "@/api/api";
import { useQuery } from "@tanstack/react-query";

export function useGetUserById(accessToken: string, userId: number) {
    const backendAPI = getAxiosBackend(accessToken);
    return useQuery({
        queryKey: ["userInfo", userId],
        queryFn: () => {
            return backendAPI.get(`/users/${userId}`).then((response) => {
                return response.data;
            })
        },
        enabled: !![accessToken, userId]
    })
}
  