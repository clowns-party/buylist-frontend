import * as Types from "../../../../types/types.generated";

import { gql } from "@apollo/client";
import * as Apollo from "@apollo/client";
const defaultOptions = {};
export type DeleteListMutationVariables = Types.Exact<{
  id: Types.Scalars["Int"];
}>;

export type DeleteListMutation = {
  __typename?: "Mutation";
  deleteList: boolean;
};

export const DeleteListDocument = gql`
  mutation deleteList($id: Int!) {
    deleteList(id: $id)
  }
`;
export type DeleteListMutationFn = Apollo.MutationFunction<
  DeleteListMutation,
  DeleteListMutationVariables
>;

/**
 * __useDeleteListMutation__
 *
 * To run a mutation, you first call `useDeleteListMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteListMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteListMutation, { data, loading, error }] = useDeleteListMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteListMutation(
  baseOptions?: Apollo.MutationHookOptions<
    DeleteListMutation,
    DeleteListMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<DeleteListMutation, DeleteListMutationVariables>(
    DeleteListDocument,
    options
  );
}
export type DeleteListMutationHookResult = ReturnType<
  typeof useDeleteListMutation
>;
export type DeleteListMutationResult =
  Apollo.MutationResult<DeleteListMutation>;
export type DeleteListMutationOptions = Apollo.BaseMutationOptions<
  DeleteListMutation,
  DeleteListMutationVariables
>;
