import { useAuthRedirect } from "../../src/features/auth/lib/hooks/useAuth";
import { useLogin } from "../../src/features/auth/lib/hooks/useLogin";
import SignIn from "../../src/features/auth/ui/SignIn";

export default function SignInPage() {
  useAuthRedirect();
  const { handleSubmit, loading } = useLogin();

  return (
    <>
      <SignIn submit={handleSubmit} loading={loading} />
    </>
  );
}
