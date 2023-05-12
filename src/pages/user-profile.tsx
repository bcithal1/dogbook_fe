import UserPage from "@/components/UserPage/UserPage";
import { useRouter } from "next/router";

function userProfile() {
  const { query } = useRouter();
  const id = +query.myParam;

  return (
    <>
      <UserPage userId={id} />
    </>
  );
}

export default userProfile;
