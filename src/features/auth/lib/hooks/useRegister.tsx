import { useRouter } from "next/router";
import { AuthRegisterInput } from "../../../../types/types.generated";
import { useRegisterMutation } from "../../model/mutations/signup/signup.mutation.generated";

export const useRegister = () => {
  const router = useRouter();
  const [registerMutation, { loading }] = useRegisterMutation();

  const register = async (values: AuthRegisterInput) => {
    try {
      await registerMutation({
        variables: { input: values },
      });
      router.push("/signin");
    } catch (error: any) {
      throw new Error(error);
    }
  };
  return { register, loading };
};
