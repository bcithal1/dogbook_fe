import UserPage from "@/components/UserPage/UserPage";
import { useRouter } from "next/router";

function userProfile() {
  const { query } = useRouter();
  const id: string = query.myParam as string;

  return (
    <>
      <UserPage userId={id} />
    </>
  );
}

export default userProfile;
