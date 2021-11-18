import * as Types from "../../../../types/types.generated";

import { gql } from "@apollo/client";
import * as Apollo from "@apollo/client";
const defaultOptions = {};
export type EditBuylistFieldMutationVariables = Types.Exact<{
  id: Types.Scalars["Int"];
  input: Types.UpdateBuylistInput;
}>;

export type EditBuylistFieldMutation = {
  __typename?: "Mutation";
  updateList: {
    __typename?: "Buylist";
    id: number;
    name: string;
    description: string;
    status: Types.Statuses;
  };
};

export const EditBuylistFieldDocument = gql`
  mutation editBuylistField($id: Int!, $input: UpdateBuylistInput!) {
    updateList(id: $id, input: $input) {
      id
      name
      description
      status
    }
  }
`;
export type EditBuylistFieldMutationFn = Apollo.MutationFunction<
  EditBuylistFieldMutation,
  EditBuylistFieldMutationVariables
>;

/**
 * __useEditBuylistFieldMutation__
 *
 * To run a mutation, you first call `useEditBuylistFieldMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useEditBuylistFieldMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [editBuylistFieldMutation, { data, loading, error }] = useEditBuylistFieldMutation({
 *   variables: {
 *      id: // value for 'id'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useEditBuylistFieldMutation(
  baseOptions?: Apollo.MutationHookOptions<
    EditBuylistFieldMutation,
    EditBuylistFieldMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    EditBuylistFieldMutation,
    EditBuylistFieldMutationVariables
  >(EditBuylistFieldDocument, options);
}
export type EditBuylistFieldMutationHookResult = ReturnType<
  typeof useEditBuylistFieldMutation
>;
export type EditBuylistFieldMutationResult =
  Apollo.MutationResult<EditBuylistFieldMutation>;
export type EditBuylistFieldMutationOptions = Apollo.BaseMutationOptions<
  EditBuylistFieldMutation,
  EditBuylistFieldMutationVariables
>;
