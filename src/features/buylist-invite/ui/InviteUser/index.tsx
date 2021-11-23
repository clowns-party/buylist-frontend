import { emailValidate } from "features/auth/lib/validators";
import {
  useInviteMutation,
  useSearchUsersLazyQuery,
} from "features/buylist-invite/model";
import { Formik } from "formik";
import { useRouter } from "next/router";
import React, { useMemo, useState } from "react";
import { ShareIcons } from "shared/icons";
import { Button, SearchInput } from "shared/ui";
import { Modal, useModal } from "shared/ui/Modal";
import { SearchItem } from "shared/ui/SearchInput";

const InviteUser = () => {
  const [selected, setSelected] = useState<SearchItem | null>(null);
  const { isOpen, closeModal, openModal } = useModal();

  const [onSearch, { data: searchedItems, loading, error }] =
    useSearchUsersLazyQuery();
  const [invite, { loading: inviteLoading }] = useInviteMutation();

  const { query: queryPage } = useRouter();
  const buyListId = Number(queryPage?.id?.toString());

  const search = async (query: string) => {
    await onSearch({
      variables: {
        query,
      },
    });
  };
  const onSelect = (item: SearchItem | null) => {
    setSelected(item);
  };

  const onInvite = async () => {
    const user = searchedItems?.searchUsers?.find(
      (user) => user?.id === selected?.key
    );
    if (user?.id && buyListId) {
      await invite({
        variables: {
          toId: user?.id,
          buyListId,
        },
      });
      closeModal();
    } else {
      throw new Error("Sorry retry later");
    }
  };

  const items = useMemo(
    () =>
      searchedItems?.searchUsers?.map(
        (user) =>
          ({
            key: user.id,
            value: user.email,
          } as SearchItem)
      ) ?? null,
    [searchedItems?.searchUsers]
  );
  return (
    <div>
      <ShareIcons className="h-5 w-5 cursor-pointer" onClick={openModal} />
      <Modal isOpen={isOpen} closeModal={closeModal}>
        <div className="h-96">
          <div className="text-center w-full mx-auto py-2 px-4 sm:px-6 lg:px-8 z-20">
            <h2 className="text-2xl font-extrabold text-black dark:text-white sm:text-4xl">
              <span className="block">Share your buylist.</span>
              <span className="block text-indigo-500">
                Use the buylist together.
              </span>
            </h2>
            <p className="text-xl mt-4 max-w-md mx-auto text-gray-400 mb-4">
              Enter the email address of the user registered on the site.
            </p>
            <Formik
              initialValues={{ email: "" }}
              validate={(values) => {
                const errors: Partial<typeof values> = {};
                if (emailValidate(values.email)) {
                  errors.email =
                    "Invalid email address, please choice from list.";
                }
                return errors;
              }}
              onSubmit={async (_, actions) => {
                try {
                  await onInvite();
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
                setFieldValue,
                isValid,
                values,
              }) => (
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                  <SearchInput
                    id="email-address"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors?.email}
                    value={values.email}
                    disabled={loading}
                    placeholder="Enter email"
                    onSearch={search}
                    select={(item) => {
                      onSelect(item);
                      setFieldValue("email", item?.value);
                    }}
                    active={selected}
                    items={items}
                  />
                  <div className="lg:mt-0 lg:flex-shrink-0">
                    <div className="mt-12 inline-flex rounded-md shadow">
                      <Button
                        type="submit"
                        loading={inviteLoading}
                        disabled={!isValid}
                      >
                        Invite
                      </Button>
                    </div>
                  </div>
                </form>
              )}
            </Formik>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default InviteUser;
