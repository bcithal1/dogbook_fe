import { useSession } from "next-auth/react";
import LoginCard from "@/components/LoginCard";
import { useRouter } from "next/router";
import Loader from "@/components/CustomComponents/Loader";


export default function LoginPage() {
  const { data: session } = useSession();
  const router = useRouter();

  if (session) {
    router.push("/home");
    return (
      <Loader />
    );
  }

  return (
    <LoginCard />
  );
}
