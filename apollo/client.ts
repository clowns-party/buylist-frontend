import {
  createHttpLink,
  ApolloLink,
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject,
} from "@apollo/client";

interface ClientArgs {
  token: string;
  initialState: NormalizedCacheObject;
}
const tempAccess =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RAbWFpbC5ydSIsInN1YiI6MSwiaWF0IjoxNjMzOTUyNDM4LCJleHAiOjE2MzQxMjUyMzh9.ZcIeFCKQ0fdJDVqf_2eOQPgmjvmqamgkaE2igUTyL5Q";
let apolloClient: ApolloClient<any> | null = null;

const httpLink = createHttpLink({
  uri: process.env.GRAPHQL_ENDPOINT
});

function createClient(
  token: ClientArgs["token"],
  initialState: ClientArgs["initialState"]
) {
  let accessToken = token;

  //   (async () => {
  //     // eslint-disable-next-line no-param-reassign
  //     accessToken = token || (await persist.willGetAccessToken());
  //   })();
  accessToken = tempAccess;

  const authLink = new ApolloLink((operation, forward) => {
    operation.setContext(({ headers }: any) => {
      return {
        headers: {
          authorization: accessToken, // however you get your token
          ...headers,
        },
      };
    });
    return forward(operation);
  }).concat(httpLink);

  return new ApolloClient({
    link: authLink,
    connectToDevTools: process.browser,
    ssrMode: !process.browser,
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

export default client;
