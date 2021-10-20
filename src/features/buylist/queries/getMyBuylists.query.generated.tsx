import * as Types from "../../../types/types.generated";

import { gql } from "@apollo/client";
import * as Apollo from "@apollo/client";
const defaultOptions = {};
export type GetMyBuylistsQueryVariables = Types.Exact<{ [key: string]: never }>;

export type GetMyBuylistsQuery = {
  __typename?: "Query";
  myBuylists: Array<{
    __typename?: "Buylists";
    id: number;
    name: string;
    description: string;
    totalPrice: number;
    status: Types.Statuses;
    ownerId: number;
  }>;
};

export const GetMyBuylistsDocument = gql`
  query getMyBuylists {
    myBuylists {
      id
      name
      description
      totalPrice
      status
      ownerId
    }
  }
`;

/**
 * __useGetMyBuylistsQuery__
 *
 * To run a query within a React component, call `useGetMyBuylistsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetMyBuylistsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetMyBuylistsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetMyBuylistsQuery(
  baseOptions?: Apollo.QueryHookOptions<
    GetMyBuylistsQuery,
    GetMyBuylistsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetMyBuylistsQuery, GetMyBuylistsQueryVariables>(
    GetMyBuylistsDocument,
    options
  );
}
export function useGetMyBuylistsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetMyBuylistsQuery,
    GetMyBuylistsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetMyBuylistsQuery, GetMyBuylistsQueryVariables>(
    GetMyBuylistsDocument,
    options
  );
}
export type GetMyBuylistsQueryHookResult = ReturnType<
  typeof useGetMyBuylistsQuery
>;
export type GetMyBuylistsLazyQueryHookResult = ReturnType<
  typeof useGetMyBuylistsLazyQuery
>;
export type GetMyBuylistsQueryResult = Apollo.QueryResult<
  GetMyBuylistsQuery,
  GetMyBuylistsQueryVariables
>;
