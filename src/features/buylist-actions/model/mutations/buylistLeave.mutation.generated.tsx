import * as Types from "../../../../types/types.generated";

import { gql } from "@apollo/client";
import * as Apollo from "@apollo/client";
const defaultOptions = {};
export type LeaveMutationVariables = Types.Exact<{
  buylistId: Types.Scalars["Int"];
}>;

export type LeaveMutation = { __typename?: "Mutation"; leave: boolean };

export const LeaveDocument = gql`
  mutation leave($buylistId: Int!) {
    leave(id: $buylistId)
  }
`;
export type LeaveMutationFn = Apollo.MutationFunction<
  LeaveMutation,
  LeaveMutationVariables
>;

/**
 * __useLeaveMutation__
 *
 * To run a mutation, you first call `useLeaveMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLeaveMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [leaveMutation, { data, loading, error }] = useLeaveMutation({
 *   variables: {
 *      buylistId: // value for 'buylistId'
 *   },
 * });
 */
export function useLeaveMutation(
  baseOptions?: Apollo.MutationHookOptions<
    LeaveMutation,
    LeaveMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<LeaveMutation, LeaveMutationVariables>(
    LeaveDocument,
    options
  );
}
export type LeaveMutationHookResult = ReturnType<typeof useLeaveMutation>;
export type LeaveMutationResult = Apollo.MutationResult<LeaveMutation>;
export type LeaveMutationOptions = Apollo.BaseMutationOptions<
  LeaveMutation,
  LeaveMutationVariables
>;
