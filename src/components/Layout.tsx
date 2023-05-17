import React, { ReactNode } from "react";
import Navbar from "./Navbar";
import { useSession } from "next-auth/react";
import { stat } from "fs";
import Loader from "./CustomComponents/Loader";

function Layout({ children }: { children: ReactNode }) {
  const { data: session, status } = useSession();

  if (status === "loading") {
    <Loader />;
  }

  return (
    <>
      {session && <Navbar />}
      {children}
    </>
  );
}

export default Layout;
