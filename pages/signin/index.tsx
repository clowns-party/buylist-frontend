import { SignInForm } from 'features/auth/ui';
import { useAuthRedirect } from "../../src/features/auth/lib/hooks/useAuth";
import { useLogin } from "../../src/features/auth/lib/hooks/useLogin";


export default function SignInPage() {
  useAuthRedirect();
  const { handleSubmit, loading } = useLogin();

  return (
    <>
      <SignInForm submit={handleSubmit} loading={loading} />
    </>
  );
}
