import * as Types from "../../../../types/types.generated";

import { gql } from "@apollo/client";
import * as Apollo from "@apollo/client";
const defaultOptions = {};
export type UserInvitesQueryVariables = Types.Exact<{ [key: string]: never }>;

export type UserInvitesQuery = {
  __typename?: "Query";
  myInvites: Array<{
    __typename?: "Invite";
    id: number;
    status: Types.InviteStatuses;
    buylist: { __typename?: "Buylist"; name: string };
    from: { __typename?: "User"; firstName: string; lastName: string };
    to: { __typename?: "User"; firstName: string; lastName: string };
  }>;
};

export const UserInvitesDocument = gql`
  query userInvites {
    myInvites {
      id
      buylist {
        name
      }
      from {
        firstName
        lastName
      }
      to {
        firstName
        lastName
      }
      status
    }
  }
`;

/**
 * __useUserInvitesQuery__
 *
 * To run a query within a React component, call `useUserInvitesQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserInvitesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserInvitesQuery({
 *   variables: {
 *   },
 * });
 */
export function useUserInvitesQuery(
  baseOptions?: Apollo.QueryHookOptions<
    UserInvitesQuery,
    UserInvitesQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<UserInvitesQuery, UserInvitesQueryVariables>(
    UserInvitesDocument,
    options
  );
}
export function useUserInvitesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    UserInvitesQuery,
    UserInvitesQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<UserInvitesQuery, UserInvitesQueryVariables>(
    UserInvitesDocument,
    options
  );
}
export type UserInvitesQueryHookResult = ReturnType<typeof useUserInvitesQuery>;
export type UserInvitesLazyQueryHookResult = ReturnType<
  typeof useUserInvitesLazyQuery
>;
export type UserInvitesQueryResult = Apollo.QueryResult<
  UserInvitesQuery,
  UserInvitesQueryVariables
>;
