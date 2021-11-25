import * as Types from "../../../../../types/types.generated";

import { gql } from "@apollo/client";
import * as Apollo from "@apollo/client";
const defaultOptions = {};
export type AcceptInviteMutationVariables = Types.Exact<{
  id: Types.Scalars["Int"];
}>;

export type AcceptInviteMutation = {
  __typename?: "Mutation";
  acceptInvite: {
    __typename?: "Invite";
    id: number;
    status: Types.InviteStatuses;
    buylist: { __typename?: "Buylist"; name: string };
    from: { __typename?: "User"; firstName: string; lastName: string };
    to: { __typename?: "User"; firstName: string; lastName: string };
  };
};

export const AcceptInviteDocument = gql`
  mutation acceptInvite($id: Int!) {
    acceptInvite(id: $id) {
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
export type AcceptInviteMutationFn = Apollo.MutationFunction<
  AcceptInviteMutation,
  AcceptInviteMutationVariables
>;

/**
 * __useAcceptInviteMutation__
 *
 * To run a mutation, you first call `useAcceptInviteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAcceptInviteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [acceptInviteMutation, { data, loading, error }] = useAcceptInviteMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useAcceptInviteMutation(
  baseOptions?: Apollo.MutationHookOptions<
    AcceptInviteMutation,
    AcceptInviteMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    AcceptInviteMutation,
    AcceptInviteMutationVariables
  >(AcceptInviteDocument, options);
}
export type AcceptInviteMutationHookResult = ReturnType<
  typeof useAcceptInviteMutation
>;
export type AcceptInviteMutationResult =
  Apollo.MutationResult<AcceptInviteMutation>;
export type AcceptInviteMutationOptions = Apollo.BaseMutationOptions<
  AcceptInviteMutation,
  AcceptInviteMutationVariables
>;
