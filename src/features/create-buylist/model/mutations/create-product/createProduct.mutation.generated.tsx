import * as Types from '../../../../../types/types.generated';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions =  {}
export type CreateProductMutationVariables = Types.Exact<{
  buyListId: Types.Scalars['Int'];
  input: Types.CreateProductBuyListInput;
}>;


export type CreateProductMutation = { __typename?: 'Mutation', createProduct: { __typename?: 'Buylist', products: Array<{ __typename?: 'Product', name: string, price: number, link?: string | null | undefined, imageUrl?: string | null | undefined, coordinate?: Array<string> | null | undefined, comment: string, buyBefore?: any | null | undefined, color?: string | null | undefined }> } };


export const CreateProductDocument = gql`
    mutation createProduct($buyListId: Int!, $input: CreateProductBuyListInput!) {
  createProduct(buyListId: $buyListId, input: $input) {
    products {
      name
      price
      link
      imageUrl
      coordinate
      comment
      buyBefore
      color
    }
  }
}
    `;
export type CreateProductMutationFn = Apollo.MutationFunction<CreateProductMutation, CreateProductMutationVariables>;

/**
 * __useCreateProductMutation__
 *
 * To run a mutation, you first call `useCreateProductMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateProductMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createProductMutation, { data, loading, error }] = useCreateProductMutation({
 *   variables: {
 *      buyListId: // value for 'buyListId'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateProductMutation(baseOptions?: Apollo.MutationHookOptions<CreateProductMutation, CreateProductMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateProductMutation, CreateProductMutationVariables>(CreateProductDocument, options);
      }
export type CreateProductMutationHookResult = ReturnType<typeof useCreateProductMutation>;
export type CreateProductMutationResult = Apollo.MutationResult<CreateProductMutation>;
export type CreateProductMutationOptions = Apollo.BaseMutationOptions<CreateProductMutation, CreateProductMutationVariables>;