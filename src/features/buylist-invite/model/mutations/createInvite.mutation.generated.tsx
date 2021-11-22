import * as Types from "../../../../types/types.generated";

import { gql } from "@apollo/client";
import * as Apollo from "@apollo/client";
const defaultOptions = {};
export type InviteMutationVariables = Types.Exact<{
  toId: Types.Scalars["Int"];
  buyListId: Types.Scalars["Int"];
}>;

export type InviteMutation = {
  __typename?: "Mutation";
  invite: {
    __typename?: "Invite";
    id: number;
    status: Types.InviteStatuses;
    from: { __typename?: "User"; id: number };
    to: { __typename?: "User"; id: number };
  };
};

export const InviteDocument = gql`
  mutation invite($toId: Int!, $buyListId: Int!) {
    invite(toUserId: $toId, buyListId: $buyListId) {
      id
      from {
        id
      }
      to {
        id
      }
      status
    }
  }
`;
export type InviteMutationFn = Apollo.MutationFunction<
  InviteMutation,
  InviteMutationVariables
>;

/**
 * __useInviteMutation__
 *
 * To run a mutation, you first call `useInviteMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useInviteMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [inviteMutation, { data, loading, error }] = useInviteMutation({
 *   variables: {
 *      toId: // value for 'toId'
 *      buyListId: // value for 'buyListId'
 *   },
 * });
 */
export function useInviteMutation(
  baseOptions?: Apollo.MutationHookOptions<
    InviteMutation,
    InviteMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<InviteMutation, InviteMutationVariables>(
    InviteDocument,
    options
  );
}
export type InviteMutationHookResult = ReturnType<typeof useInviteMutation>;
export type InviteMutationResult = Apollo.MutationResult<InviteMutation>;
export type InviteMutationOptions = Apollo.BaseMutationOptions<
  InviteMutation,
  InviteMutationVariables
>;
