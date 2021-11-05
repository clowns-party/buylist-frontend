import {
  GetProfileQuery,
  useGetProfileQuery,
} from "../../queries/getProfile.query.generated";
import { Button, Input } from "shared/ui";
import { Formik } from "formik";
import { useUpdateUser } from "features/profile/hooks/useUpdateUser";
import { emailValidate } from "features/auth/lib/validators";

interface Props {
  closeEdit: () => void;
  user: GetProfileQuery["profile"] | undefined;
}

export type UpdateUser = {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
};

export default function ProfileEdit({ closeEdit, user }: Props) {
  const { updateUser, loading } = useUpdateUser();
  const submit = async (values: UpdateUser) => {
    await updateUser(values);
    closeEdit();
  };
  const initialValues: UpdateUser = {
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    phone: user?.phone || "",
    email: user?.email || "",
  };
  return (
    <Formik
      initialValues={initialValues}
      validate={(values) => {
        const errors: Partial<typeof values> = {};
        if (!values.firstName) {
          errors.firstName = "The field cannot be empty";
        }
        if (!values.lastName) {
          errors.lastName = "The field cannot be empty";
        }
        if (!values.email) {
          errors.email = "The field cannot be empty";
        }
        if (values.email && emailValidate(values.email)) {
          errors.email = "Email is not valid";
        }
        return errors;
      }}
      onSubmit={submit}
    >
      {({
        errors,
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        isValid,
        touched,
        setTouched,
      }) => {
        return (
          <form onSubmit={handleSubmit}>
            <div className="mt-10 sm:mt-0">
              <div className="md:grid md:grid-cols-3 md:gap-6">
                <div className="md:col-span-1">
                  <div className="px-4 sm:px-0">
                    <h3 className="text-lg font-medium leading-6 text-gray-900">
                      Personal Information
                    </h3>
                    <p className="mt-1 text-sm text-gray-600">
                      Use a permanent address where you can receive mail.
                    </p>
                  </div>
                </div>
                <div className="mt-5 md:mt-0 md:col-span-2">
                  <div className="shadow overflow-hidden sm:rounded-md">
                    <div className="px-4 py-5 bg-white sm:p-6">
                      <div className="grid grid-cols-6 gap-6">
                        <div className="col-span-6 sm:col-span-3">
                          <label
                            htmlFor="firstName"
                            className="block text-sm font-medium text-gray-700"
                          >
                            First name
                          </label>
                          <Input
                            type="text"
                            name="firstName"
                            id="firstName"
                            value={values?.firstName}
                            error={errors.firstName}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                          />
                        </div>

                        <div className="col-span-6 sm:col-span-3">
                          <label
                            htmlFor="lastName"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Last name
                          </label>
                          <Input
                            value={values?.lastName}
                            error={errors.lastName}
                            onChange={handleChange}
                            type="text"
                            name="lastName"
                            id="lastName"
                            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                          />
                        </div>

                        <div className="col-span-6 sm:col-span-4">
                          <label
                            htmlFor="email-address"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Email address
                          </label>
                          <Input
                            value={values?.email}
                            error={errors.email}
                            onChange={handleChange}
                            type="text"
                            name="email"
                            id="email"
                            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                          />
                        </div>

                        <div className="col-span-6 sm:col-span-4">
                          <label
                            htmlFor="email-address"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Phone
                          </label>
                          <Input
                            value={values?.phone}
                            error={errors.phone}
                            onChange={handleChange}
                            type="text"
                            name="phone"
                            id="phone"
                            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="px-4 py-3 bg-gray-50 text-right sm:px-6 flex align-center justify-end">
                      <Button
                        disabled={loading}
                        onClick={closeEdit}
                        type="button"
                        variant="danger"
                        className="mr-4 inline-flex justify-center py-2 px-4"
                      >
                        Close
                      </Button>
                      <Button
                        loading={loading}
                        disabled={loading}
                        type="submit"
                        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        Save
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="hidden sm:block" aria-hidden="true">
              <div className="py-5">
                <div className="border-t border-gray-200" />
              </div>
            </div>
          </form>
        );
      }}
    </Formik>
  );
}
