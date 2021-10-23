import { LockClosedIcon } from "@heroicons/react/solid";
import { Formik } from "formik";
import Link from "next/link";
import React from "react";
import Button from "../../../../shared/ui/Button";
import Input from "../../../../shared/ui/Input";
import { emailValidate } from "../../lib/validators";
import { LoginMutationVariables } from "../../model/mutations/signin/sigin.mutation.generated";

interface Props {
  submit: (values: LoginMutationVariables) => void;
  loading: boolean;
}
export default function SignIn({ submit, loading }: Props) {
  return (
    <>
      <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <img
              className="mx-auto h-12 w-auto"
              src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
              alt="Workflow"
            />
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Sign in to your account
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Or{" "}
              <Link href="/signup">
                <a
                  href="/signup"
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  sign up
                </a>
              </Link>
            </p>
          </div>
          <Formik
            initialValues={{ email: "", password: "" }}
            validate={(values) => {
              const errors: Partial<typeof values> = {};
              if (emailValidate(values.email)) {
                errors.email = "Invalid email address";
              }
              return errors;
            }}
            onSubmit={async (values, actions) => {
              try {
                await submit(values);
              } catch (error: any) {
                actions.setErrors({
                  email: error?.message,
                  password: " ",
                });
              }
            }}
          >
            {({
              errors,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
            }) => (
              <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                <input type="hidden" name="remember" defaultValue="true" />
                <div className="rounded-md shadow-sm -space-y-px ">
                  <div className="gap-4 mb-2 ">
                    <label htmlFor="email-address" className="sr-only">
                      Email address
                    </label>
                    <Input
                      id="email-address"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      placeholder="Email address"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={errors?.email}
                      disabled={loading}
                    />
                  </div>
                  <div>
                    <label htmlFor="password" className="sr-only">
                      Password
                    </label>
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      required
                      placeholder="Password"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={errors?.password}
                      disabled={loading}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                    <label
                      htmlFor="remember-me"
                      className="ml-2 block text-sm text-gray-900"
                    >
                      Remember me
                    </label>
                  </div>

                  <div className="text-sm">
                    <a
                      href="#"
                      className="font-medium text-indigo-600 hover:text-indigo-500"
                    >
                      Forgot your password?
                    </a>
                  </div>
                </div>

                <div>
                  <Button
                    type="submit"
                    className="w-full"
                    loading={loading}
                    disabled={isSubmitting || loading}
                  >
                    <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                      <LockClosedIcon
                        className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                        aria-hidden="true"
                      />
                    </span>
                    Sign in
                  </Button>
                </div>
              </form>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
}
