import {
  ApolloClient,
  ApolloProvider,
  NormalizedCacheObject,
} from "@apollo/client";
import type { AppProps } from "next/app";
import { useEffect, useState } from "react";
import client, { useApollo } from "../apollo/client";
import { AuthProvider } from "../src/features/auth/AuthContext";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  const apolloClient = useApollo(pageProps, "");

  const [apolloClientAuth, setApolloClient] =
    useState<ApolloClient<NormalizedCacheObject> | null>(null);

  useEffect(() => {
    if (apolloClientAuth) {
      const currentState = apolloClient.extract();
      apolloClientAuth.cache.restore(currentState);
      apolloClient.stop();
    }
  }, [apolloClientAuth]);

  const updateTokenLink = (token: string) => {
    token && setApolloClient(client(token, {}));
  };

  return (
    <ApolloProvider client={apolloClient}>
      <AuthProvider setApolloClient={updateTokenLink}>
        <Component {...pageProps} />
      </AuthProvider>
    </ApolloProvider>
  );
}
export default MyApp;
