import { SignUpForm } from "features/auth/ui";
import React from "react";
import { useAuthRedirect } from "../../src/features/auth/lib/hooks/useAuth";
import { useRegister } from "../../src/features/auth/lib/hooks/useRegister";

export default function SignUpPage() {
  useAuthRedirect();
  const { register, loading } = useRegister();
  return (
    <>
      <SignUpForm submit={register} loading={loading} />
    </>
  );
}
