import * as Types from '../../../../types/types.generated';

import { gql } from '@apollo/client';
import { UserFieldsFragmentDoc } from '../../../user/model/user.fragment.generated';
import * as Apollo from '@apollo/client';
const defaultOptions =  {}
export type GetBuylistByIdQueryVariables = Types.Exact<{
  id: Types.Scalars['Int'];
}>;


export type GetBuylistByIdQuery = { __typename?: 'Query', buylist: { __typename?: 'Buylist', id: number, name: string, description: string, totalPrice: number, status: Types.Statuses, ownerId: number, products: Array<{ __typename?: 'Product', id: number, name: string, price: number, link?: string | null | undefined, imageUrl?: string | null | undefined, coordinate?: Array<string> | null | undefined, buyBefore?: any | null | undefined, color?: string | null | undefined, authorId: number, comment: string, author: { __typename?: 'User', id: number, firstName: string, lastName: string, phone: string, email: string } }>, owner: { __typename?: 'User', id: number, firstName: string, lastName: string, phone: string, email: string }, members: Array<{ __typename?: 'Member', id: number, user: { __typename?: 'User', id: number, firstName: string, lastName: string, phone: string, email: string } }> } };


export const GetBuylistByIdDocument = gql`
    query getBuylistById($id: Int!) {
  buylist(id: $id) {
    id
    name
    description
    totalPrice
    status
    products {
      id
      name
      price
      link
      imageUrl
      coordinate
      buyBefore
      color
      authorId
      comment
      author {
        ...UserFields
      }
    }
    ownerId
    owner {
      ...UserFields
    }
    members {
      id
      user {
        ...UserFields
      }
    }
  }
}
    ${UserFieldsFragmentDoc}`;

/**
 * __useGetBuylistByIdQuery__
 *
 * To run a query within a React component, call `useGetBuylistByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetBuylistByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetBuylistByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetBuylistByIdQuery(baseOptions: Apollo.QueryHookOptions<GetBuylistByIdQuery, GetBuylistByIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetBuylistByIdQuery, GetBuylistByIdQueryVariables>(GetBuylistByIdDocument, options);
      }
export function useGetBuylistByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetBuylistByIdQuery, GetBuylistByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetBuylistByIdQuery, GetBuylistByIdQueryVariables>(GetBuylistByIdDocument, options);
        }
export type GetBuylistByIdQueryHookResult = ReturnType<typeof useGetBuylistByIdQuery>;
export type GetBuylistByIdLazyQueryHookResult = ReturnType<typeof useGetBuylistByIdLazyQuery>;
export type GetBuylistByIdQueryResult = Apollo.QueryResult<GetBuylistByIdQuery, GetBuylistByIdQueryVariables>;