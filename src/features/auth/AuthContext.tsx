/* eslint-disable react-hooks/rules-of-hooks */
import { ApolloError, useApolloClient } from "@apollo/client";
import { useRouter } from "next/router";
import React, { createContext } from "react";
import { useCookie } from "react-use";
import { AUTH_TOKEN } from "../../../apollo/client";
import {
  GetProfileQuery,
  useGetProfileQuery,
} from "../profile/getProfile.query.generated";

interface AuthContextValue {
  logout: () => void;
  loading: boolean | undefined;
  error: ApolloError | undefined;
  user: GetProfileQuery["profile"] | undefined;
  setApolloClient: (token: string) => void;
  refetch: any;
}

const defaultAuthContext: AuthContextValue = {
  logout: () => {},
  loading: false,
  error: undefined,
  user: undefined,
  setApolloClient: (token: string) => {},
  refetch: () => {},
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
  const [token, __, removeTokenFromCookie] = useCookie(AUTH_TOKEN);

  const identityData = token
    ? useGetProfileQuery({
        notifyOnNetworkStatusChange: true,
      })
    : null;

  const router = useRouter();
  const apolloClient = useApolloClient();

  const logout = (): void => {
    removeTokenFromCookie();
    apolloClient.clearStore();
    router.reload();
  };

  return (
    <AuthContext.Provider
      value={{
        logout,
        loading: identityData?.loading,
        error: identityData?.error,
        user: identityData?.data?.profile,
        setApolloClient,
        refetch: identityData?.refetch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
