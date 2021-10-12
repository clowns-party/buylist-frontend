import {
  ApolloClient,
  ApolloLink,
  createHttpLink,
  InMemoryCache,
  NormalizedCacheObject,
} from "@apollo/client";
import cookie from "cookie";
import { GetServerSidePropsContext } from "next";
import { useMemo } from "react";

interface ClientArgs {
  token: string;
  initialState: NormalizedCacheObject;
}

const isSSR = !process.browser;
export const AUTH_TOKEN = "authorization";
export const APOLLO_STATE_PROP_NAME = "__APOLLO_STATE__";

let apolloClient: ApolloClient<any> | null = null;

export const getToken = (context?: GetServerSidePropsContext): string => {
  const headerCookie = context?.req?.headers?.cookie;
  const cookies = cookie.parse(
    headerCookie && isSSR ? headerCookie || "" : !isSSR ? document?.cookie : ""
  );
  return cookies[AUTH_TOKEN] || "";
};

const httpLink = createHttpLink({
  uri: process.env.GRAPHQL_ENDPOINT,
});

function createClient(
  token: ClientArgs["token"],
  initialState: ClientArgs["initialState"]
) {
  const tokenGet = getToken();
  const authorization = token || tokenGet ? `Bearer ${token || tokenGet}` : "";

  const authLink = new ApolloLink((operation, forward) => {
    operation.setContext(({ headers }: any) => {
      return {
        headers: {
          authorization, // however you get your token
          ...headers,
        },
      };
    });
    return forward(operation);
  }).concat(httpLink);

  return new ApolloClient({
    link: authLink,
    connectToDevTools: !isSSR,
    ssrMode: isSSR,
    cache: new InMemoryCache().restore(initialState || {}),
  });
}

const client = (
  token: ClientArgs["token"],
  initialState: ClientArgs["initialState"]
) => {
  if (!process.browser) {
    return createClient(token, initialState);
  }
  if (!apolloClient) {
    apolloClient = createClient(token, initialState);
  }
  return apolloClient;
};

export function useApollo(pageProps: any, token?: string) {
  const state = { ...pageProps[APOLLO_STATE_PROP_NAME] };
  const store = useMemo(() => client(token || "", state), [state, token]);
  return store;
}

export default client;
