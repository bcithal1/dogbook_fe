import { getAxiosBackend } from "@/api/api";
import { User } from "@/types/user";
import { useMutation, useQuery } from "@tanstack/react-query";

export function useGetUserWithId(id: number, accessToken: string) {
  const backendAPI = getAxiosBackend(accessToken);
  const { status, data } = useQuery({
    queryKey: ["getUserwithID", id],
    queryFn: () => {
      return backendAPI
        .get<User>(`/api/v1/users/${id}`)
        .then((res) => res.data);
    },
  });
}
