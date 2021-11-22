import * as Types from '../../../../types/types.generated';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions =  {}
export type CreateBuylistMutationVariables = Types.Exact<{
  input: Types.CreateBuylistInput;
}>;


export type CreateBuylistMutation = { __typename?: 'Mutation', createList: { __typename?: 'Buylist', id: number, name: string, description: string, totalPrice: number, status: Types.Statuses, ownerId: number } };


export const CreateBuylistDocument = gql`
    mutation createBuylist($input: CreateBuylistInput!) {
  createList(input: $input) {
    id
    name
    description
    totalPrice
    status
    ownerId
  }
}
    `;
export type CreateBuylistMutationFn = Apollo.MutationFunction<CreateBuylistMutation, CreateBuylistMutationVariables>;

/**
 * __useCreateBuylistMutation__
 *
 * To run a mutation, you first call `useCreateBuylistMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateBuylistMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createBuylistMutation, { data, loading, error }] = useCreateBuylistMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateBuylistMutation(baseOptions?: Apollo.MutationHookOptions<CreateBuylistMutation, CreateBuylistMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateBuylistMutation, CreateBuylistMutationVariables>(CreateBuylistDocument, options);
      }
export type CreateBuylistMutationHookResult = ReturnType<typeof useCreateBuylistMutation>;
export type CreateBuylistMutationResult = Apollo.MutationResult<CreateBuylistMutation>;
export type CreateBuylistMutationOptions = Apollo.BaseMutationOptions<CreateBuylistMutation, CreateBuylistMutationVariables>;