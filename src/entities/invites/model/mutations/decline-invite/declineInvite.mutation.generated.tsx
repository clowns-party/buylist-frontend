import * as Types from "../../../../../types/types.generated";

import { gql } from "@apollo/client";
import * as Apollo from "@apollo/client";
const defaultOptions = {};
export type DeclineInviteMutationVariables = Types.Exact<{
  id: Types.Scalars["Int"];
}>;

export type DeclineInviteMutation = {
  __typename?: "Mutation";
  declineInvite: {
    __typename?: "Invite";
    id: number;
    status: Types.InviteStatuses;
    buylist: { __typename?: "Buylist"; name: string };
    from: { __typename?: "User"; firstName: string; lastName: string };
    to: { __typename?: "User"; firstName: string; lastName: string };
  };
};

export const DeclineInviteDocument = gql`
  mutation declineInvite($id: Int!) {
    declineInvite(id: $id) {
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
export type DeclineInviteMutationFn = Apollo.MutationFunction<
  DeclineInviteMutation,
  DeclineInviteMutationVariables
>;

/**
 * __useDeclineInviteMutation__
 *
 * To run a mutation, you first call `useDeclineInviteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeclineInviteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [declineInviteMutation, { data, loading, error }] = useDeclineInviteMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeclineInviteMutation(
  baseOptions?: Apollo.MutationHookOptions<
    DeclineInviteMutation,
    DeclineInviteMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    DeclineInviteMutation,
    DeclineInviteMutationVariables
  >(DeclineInviteDocument, options);
}
export type DeclineInviteMutationHookResult = ReturnType<
  typeof useDeclineInviteMutation
>;
export type DeclineInviteMutationResult =
  Apollo.MutationResult<DeclineInviteMutation>;
export type DeclineInviteMutationOptions = Apollo.BaseMutationOptions<
  DeclineInviteMutation,
  DeclineInviteMutationVariables
>;
