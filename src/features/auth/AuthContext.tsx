import { ApolloError, useApolloClient } from "@apollo/client";
import { useRouter } from "next/router";
import React, { createContext, useContext } from "react";
import { useCookie } from "react-use";
import { AUTH_TOKEN } from "../../../apollo/client";
import {
  GetProfileQuery,
  useGetProfileQuery,
} from "../profile/getProfile.query.generated";

interface AuthContextValue {
  logout: () => void;
  getUserLoading: any;
  getUserError: ApolloError | any;
  user: GetProfileQuery | undefined;
  setApolloClient: (token: string) => void;
  refetch: any;
}

const defaultAuthContext: AuthContextValue = {
  logout: () => {},
  getUserLoading: false,
  getUserError: undefined,
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
  const identityData =
    token &&
    useGetProfileQuery({
      notifyOnNetworkStatusChange: true,
    });

  let data,
    loading,
    refetch,
    error = null;

  if (identityData) {
    ({ data, loading, error, refetch } = identityData);
  }

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
        getUserLoading: loading,
        getUserError: error,
        user: data,
        setApolloClient,
        refetch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  return context;
};
