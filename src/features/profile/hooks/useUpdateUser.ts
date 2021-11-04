import { UpdateUser } from "../ui/edit";
import { useUpdateUserMutation } from "features/profile/hooks";
import { useGetProfileQuery } from "../queries/getProfile.query.generated";

export const useUpdateUser = () => {
  const [updateUserMutation, { loading, error }] = useUpdateUserMutation();
  const { refetch } = useGetProfileQuery();
  const updateUser = async (values: UpdateUser) => {
    try {
      await updateUserMutation({
        variables: { input: values },
      });
      await refetch();
    } catch (error: any) {
      throw new Error(error);
    }
  };
  return { updateUser, loading };
};
