import { useUpdateUserMutation } from "features/profile/hooks";
import { UpdateUser } from "../ui/edit";
import { useAuth } from "./../../auth/lib/hooks/useAuth";

export const useUpdateUser = () => {
  const [updateUserMutation, { loading, error }] = useUpdateUserMutation();

  const { refetch } = useAuth();
  const updateUser = async (values: UpdateUser) => {
    try {
      await updateUserMutation({
        variables: { input: values },
      });
      await refetch?.();
    } catch (error: any) {
      throw new Error(error);
    }
  };
  return { updateUser, loading };
};
