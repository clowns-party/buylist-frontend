import { useAcceptInviteMutation } from "../model/mutations/accept-invite/acceptInvite.mutation.generated";
import { useDeclineInviteMutation } from "../model/mutations/decline-invite/declineInvite.mutation.generated";
import { useUserInvitesQuery } from "../model/queries/userInvites.query.generated";

export const useInvites = () => {
  const { data, refetch } = useUserInvitesQuery();
  const [acceptInviteMutation, { loading: loadiingAI, error: errorAI }] =
    useAcceptInviteMutation();
  const [declineInviteMutation, { loading: loadingDI, error: errorDI }] =
    useDeclineInviteMutation();

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

  const declineInvite = async (id: number) => {
    try {
      await declineInviteMutation({
        variables: { id },
      });
    } catch (error: any) {
      throw new Error(error);
    }
  };

  return {
    invites: data?.myInvites,
    refetchInvites: refetch,
    acceptInvite,
    declineInvite,
  };
};
