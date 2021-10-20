import {
  ApolloError,
  ApolloQueryResult,
  useApolloClient,
} from "@apollo/client";
import React, { createContext } from "react";
import { useCookie } from "react-use";
import { AUTH_TOKEN } from "../../../apollo/client";
import { Exact } from "../../types/types.generated";
import {
  GetProfileQuery,
  useGetProfileQuery,
} from "../profile/queries/getProfile.query.generated";

interface AuthContextValue {
  logout: () => void;
  syncLogin: (access: string) => void;
  loading: boolean | undefined;
  error: ApolloError | undefined;
  user: GetProfileQuery["profile"] | undefined;
  token?: string | null;
  setApolloClient: (token: string) => void;
  refetch?: (
    variables?:
      | Partial<
          Exact<{
            [key: string]: never;
          }>
        >
      | undefined
  ) => Promise<ApolloQueryResult<GetProfileQuery>>;
}

const defaultAuthContext: AuthContextValue = {
  logout: () => {},
  syncLogin: (access: string) => {},
  loading: false,
  error: undefined,
  user: undefined,
  setApolloClient: (token: string) => {},
};

export const AuthContext = createContext<AuthContextValue>(defaultAuthContext);

type Props = {
  setApolloClient: (token: string) => void;
  children: React.ReactNode;
};

export const AuthProvider: React.FC<Props> = ({
  children,
  setApolloClient,
}) => {
  const apolloClient = useApolloClient();
  const cookie = useCookie(AUTH_TOKEN);
  const [token, setToken, removeTokenFromCookie] = cookie;

  const { data, loading, error, refetch } = useGetProfileQuery({
    notifyOnNetworkStatusChange: true,
    skip: !token,
  });

  const logout = (): void => {
    removeTokenFromCookie();
    apolloClient.clearStore();
  };

  const syncLogin = (access: string) => {
    setApolloClient(access || "");
    setToken(access || "");
  };

  return (
    <AuthContext.Provider
      value={{
        logout,
        syncLogin,
        loading,
        error,
        user: data?.profile,
        setApolloClient,
        refetch,
        token,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
