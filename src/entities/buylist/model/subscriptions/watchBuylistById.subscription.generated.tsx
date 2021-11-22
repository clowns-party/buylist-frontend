import * as Types from '../../../../types/types.generated';

import { gql } from '@apollo/client';
import { UserFieldsFragmentDoc } from '../../../user/model/user.fragment.generated';
import * as Apollo from '@apollo/client';
const defaultOptions =  {}
export type GetBuylistByidSubscriptionVariables = Types.Exact<{
  id: Types.Scalars['Int'];
}>;


export type GetBuylistByidSubscription = { __typename?: 'Subscription', buylistWatch: { __typename?: 'Buylist', id: number, name: string, description: string, totalPrice: number, status: Types.Statuses, ownerId: number, products: Array<{ __typename?: 'Product', id: number, name: string, price: number, link?: string | null | undefined, imageUrl?: string | null | undefined, coordinate?: Array<string> | null | undefined, buyBefore?: any | null | undefined, color?: string | null | undefined, authorId: number, author: { __typename?: 'User', id: number, firstName: string, lastName: string, phone: string, email: string } }>, owner: { __typename?: 'User', id: number, firstName: string, lastName: string, phone: string, email: string }, members: Array<{ __typename?: 'Member', id: number, user: { __typename?: 'User', id: number, firstName: string, lastName: string, phone: string, email: string } }> } };


export const GetBuylistByidDocument = gql`
    subscription getBuylistByid($id: Int!) {
  buylistWatch(id: $id) {
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
 * __useGetBuylistByidSubscription__
 *
 * To run a query within a React component, call `useGetBuylistByidSubscription` and pass it any options that fit your needs.
 * When your component renders, `useGetBuylistByidSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetBuylistByidSubscription({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetBuylistByidSubscription(baseOptions: Apollo.SubscriptionHookOptions<GetBuylistByidSubscription, GetBuylistByidSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<GetBuylistByidSubscription, GetBuylistByidSubscriptionVariables>(GetBuylistByidDocument, options);
      }
export type GetBuylistByidSubscriptionHookResult = ReturnType<typeof useGetBuylistByidSubscription>;
export type GetBuylistByidSubscriptionResult = Apollo.SubscriptionResult<GetBuylistByidSubscription>;