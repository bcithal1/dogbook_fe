import Navbar from "@/components/Navbar";
import UserPage from "@/components/UserPage/UserPage";
import { useRouter } from "next/router";

function userProfile() {
  const { query } = useRouter();
  console.log(query.myParam);
  const id: string = query.myParam as string;

  return (
    <>
      <UserPage userId={id} />
    </>
  );
}

export default userProfile;
