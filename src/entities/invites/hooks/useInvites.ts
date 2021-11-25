import { useAcceptInviteMutation } from "../model/mutations/accept-invite/acceptInvite.mutation.generated";
import { useUserInvitesQuery } from "../model/queries/userInvites.query.generated";

export const useInvites = () => {
  const { data, refetch } = useUserInvitesQuery();
  const [acceptInviteMutation, { loading, error }] = useAcceptInviteMutation();

  const acceptInvite = async (id: number) => {
    try {
      await acceptInviteMutation({
        variables: { id },
      });
      await refetch?.();
    } catch (error: any) {
      throw new Error(error);
    }
  };

  const declineInvite = (id: number) => {};

  return {
    invites: data?.myInvites,
    refetchInvites: refetch,
    acceptInvite,
    declineInvite,
  };
};
