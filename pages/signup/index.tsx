import { useRouter } from "next/router";
import React from "react";
import { useAuthRedirect } from "../../src/features/auth/lib/hooks/useAuth";
import { useRegister } from "../../src/features/auth/lib/hooks/useRegister";
import { useRegisterMutation } from "../../src/features/auth/model/mutations/signup/signup.mutation.generated";
import SignUp from "../../src/features/auth/ui/SignUp";
import { AuthRegisterInput } from "../../src/types/types.generated";

export default function SignUpPage() {
  useAuthRedirect();
  const { register, loading } = useRegister();
  return (
    <>
      <SignUp submit={register} loading={loading} />
    </>
  );
}
