import axios from "axios";
import { useSession, signIn, signOut } from "next-auth/react";
import { useState } from "react";
import { ChakraProvider } from '@chakra-ui/react'


export default function index() {
  const { data: session } = useSession();
  const [name, setName] = useState(session?.user.name);

  const doSubmit = () => {
    // eslint-disable-next-line max-len
    // TODO(Trystan): Make this an axios instance. So that every use does not have to inject the header.
    axios.put(
      `http://localhost:8080/api/v1/users/${session?.user.id}`,
      { ...session.user, name },
      {
        headers: { Authorization: `Bearer ${session.accessToken}` },
      }
    );
  };

  if (session) {
    return (
      <>
        Signed in as {session.user.name} <br />
        <button onClick={() => signOut()}>Sign out</button>
        <form onSubmit={doSubmit}>
          <input
            type="text"
            placeholder={session.user.name}
            onChange={(e) => setName(e.target.value)}
          />
          <button type="submit">Update name</button>
        </form>
      </>
    );
  }

  return (
    <>
        <button id="sign-in"
        onClick={() => signIn(null, {callbackUrl: "/home"})}>
          Sign in with GitHub
        </button>
    </>
  );
}
