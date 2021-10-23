import { useLoginMutation } from "../../model/mutations/signin/sigin.mutation.generated";
import { useAuth } from "./useAuth";

export const useLogin = () => {
  const [login, { loading, error }] = useLoginMutation();
  const { syncLogin, loading: authLoading, error: authError } = useAuth();

  const handleSubmit = async (values: { email: string; password: string }) => {
    const { email, password } = values;
    try {
      const loginData = await login({
        variables: {
          email,
          password,
        },
      });
      const access = loginData?.data?.login || "";
      syncLogin(access);
    } catch (error: any) {
      throw new Error(error);
    }
  };
  return {
    handleSubmit,
    loading: Boolean(loading || authLoading),
  };
};
