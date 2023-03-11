import { SessionProvider } from "next-auth/react";
import '@/styles/globals.css';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();
export default function App({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider session={session}>
        <Component {...pageProps} />
      </SessionProvider>
    </QueryClientProvider>
  );
}
