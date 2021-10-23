import { Formik } from "formik";
import Link from "next/link";
import React, { FormEvent } from "react";
import Button from "../../../../shared/ui/Button";
import Input from "../../../../shared/ui/Input";
import { AuthRegisterInput } from "../../../../types/types.generated";
import {
  emailValidate,
  phoneValidate,
  validateName,
} from "../../lib/validators";
interface Props {
  submit: (values: AuthRegisterInput) => void;
  loading: boolean;
}
export default function SignUp({ submit, loading }: Props) {
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
              Create a new account
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Already have an account ?{" "}
              <Link href="/signin">
                <a
                  href="#"
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Sign in
                </a>
              </Link>
            </p>
          </div>
          <Formik
            initialValues={{
              email: "",
              firstName: "",
              lastName: "",
              password: "",
              phone: "",
            }}
            validate={(values) => {
              const errors: Partial<typeof values> = {};
              if (emailValidate(values.email)) {
                errors.email = "Invalid email address";
              }
              if (phoneValidate(values.phone)) {
                errors.phone = "Wrong phone";
              }
              if (validateName(values.firstName)) {
                errors.firstName = "Wrong first name!";
              }
              if (validateName(values.lastName)) {
                errors.lastName = "Wrong last name!";
              }
              if (!values.password) {
                errors.password = "Is required!";
              }
              return errors;
            }}
            onSubmit={async (values, actions) => {
              try {
                await submit(values);
              } catch (error: any) {
                actions.setErrors({
                  email: error?.message,
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
              <form onSubmit={handleSubmit}>
                <div className="flex flex-col mb-2">
                  <div className=" relative ">
                    <Input
                      type="tel"
                      id="create-account-phone"
                      name="phone"
                      placeholder="Phone"
                      error={errors.phone}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      disabled={loading}
                    />
                  </div>
                </div>
                <div className="flex gap-4 mb-2 justify-between">
                  <div className=" relative ">
                    <Input
                      type="text"
                      id="create-account-first-name"
                      name="firstName"
                      placeholder="First name"
                      error={errors.firstName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      disabled={loading}
                    />
                  </div>
                  <div className=" relative ">
                    <Input
                      type="text"
                      id="create-account-last-name"
                      name="lastName"
                      placeholder="Last name"
                      error={errors.lastName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      disabled={loading}
                    />
                  </div>
                </div>
                <div className="flex flex-col mb-2">
                  <div className=" relative ">
                    <Input
                      type="text"
                      id="create-account-email"
                      name="email"
                      placeholder="Email"
                      error={errors.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      disabled={loading}
                    />
                  </div>
                </div>
                <div className="flex flex-col mb-2">
                  <div className=" relative ">
                    <Input
                      type="password"
                      id="create-account-password"
                      name="password"
                      placeholder="Password"
                      error={errors.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      disabled={loading}
                    />
                  </div>
                </div>
                <div className="flex w-full my-4">
                  <Button
                    type="submit"
                    className="w-full"
                    loading={loading}
                    disabled={loading}
                  >
                    Sign Up
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
