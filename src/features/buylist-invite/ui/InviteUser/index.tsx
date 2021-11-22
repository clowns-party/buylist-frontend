import {
  useInviteMutation,
  useSearchUsersLazyQuery,
} from "features/buylist-invite/model";
import { useState } from "react";
import React from "react";
import { useDebounce } from "react-use";
import { ShareIcons } from "shared/icons";
import { Button, Input } from "shared/ui";
import { Modal, useModal } from "shared/ui/Modal";
import { SearchUsersQuery } from "features/buylist-invite/model/queries/searchUsers.query.generated";
import { useRouter } from "next/router";

const InviteUser = () => {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<
    SearchUsersQuery["searchUsers"]["0"] | null
  >(null);
  const { isOpen, closeModal, openModal } = useModal();
  const [onSearch, { data, loading, error }] = useSearchUsersLazyQuery();
  const [invite, { loading: inviteLoading }] = useInviteMutation();
  const { query: queryPage } = useRouter();
  const buyListId = Number(queryPage?.id?.toString());

  const [, close] = useDebounce(
    async () => {
      if (!query?.length) return;
      await onSearch({
        variables: {
          query,
        },
      });
    },
    600,
    [query]
  );
  const onChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(target.value);
    setSelected(null);
  };

  const onInvite = async () => {
    if (selected?.id && buyListId) {
      await invite({
        variables: {
          toId: selected?.id,
          buyListId,
        },
      });
    } else {
      alert("!!!!");
    }
  };
  return (
    <div>
      <ShareIcons className="h-5 w-5 cursor-pointer" onClick={openModal} />
      <Modal isOpen={isOpen} closeModal={closeModal}>
        <Input placeholder="Find user for invite" onChange={onChange} />
        {data?.searchUsers?.map((user) => {
          return (
            <div
              key={user.id}
              onClick={() => {
                setSelected(user);
              }}
              style={{
                border: selected?.id === user?.id ? "1px solid" : "",
              }}
            >
              {user.email}
            </div>
          );
        })}

        <Button onClick={onInvite} loading={inviteLoading}>
          Invite
        </Button>
      </Modal>
    </div>
  );
};

export default InviteUser;
