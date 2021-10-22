import { useRouter } from "next/router";
import React from "react";
import { useAuthRedirect } from "../../src/features/auth/lib/hooks/useAuth";
import { useRegisterMutation } from "../../src/features/auth/model/mutations/signup/signup.mutation.generated";
import SignUp from "../../src/features/auth/ui/SignUp";
import { AuthRegisterInput } from "../../src/types/types.generated";

export default function SignUpPage() {
  useAuthRedirect();

  const router = useRouter();
  const [register, { loading }] = useRegisterMutation();

  const onFinish = async (values: AuthRegisterInput) => {
    const input: AuthRegisterInput = {
      email: values?.email,
      firstName: values?.firstName,
      lastName: values?.lastName,
      password: values?.password,
      phone: values.phone,
    };

    try {
      await register({
        variables: { input },
      });
      router.push("/signin");
    } catch (error: any) {
      const message = error?.message;
    }
  };

  return (
    <>
      <SignUp submit={onFinish} />
    </>
  );
}
