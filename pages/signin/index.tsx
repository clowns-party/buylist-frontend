import {
  useAuth,
  useAuthRedirect,
} from "../../src/features/auth/lib/hooks/useAuth";
import { useLoginMutation } from "../../src/features/auth/model/mutations/signin/sigin.mutation.generated";
import SignIn from "../../src/features/auth/ui/SignIn";

export default function SignInPage() {
  useAuthRedirect();
  const [login, { loading }] = useLoginMutation();
  const { syncLogin, loading: userLoading } = useAuth();

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
      const message = error?.message;
    }
  };

  return (
    <>
      <SignIn submit={handleSubmit} />
    </>
  );
}
