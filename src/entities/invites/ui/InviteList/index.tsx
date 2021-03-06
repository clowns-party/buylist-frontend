import { Menu, Transition } from "@headlessui/react";
import { BellIcon } from "@heroicons/react/outline";
import { UserInvitesQuery } from "entities/invites/model/queries/userInvites.query.generated";
import { useAuth } from "features/auth/lib/hooks/useAuth";
import React, { Fragment } from "react";
import { UserAvatar } from "shared/icons";

type InviteType = {
  invites: UserInvitesQuery["myInvites"] | undefined;
  acceptInvite: (id: number) => void;
  declineInvite: (id: number) => void;
};

const InviteList = ({ invites, acceptInvite, declineInvite }: InviteType) => {
  const experationInvites: UserInvitesQuery["myInvites"] =
    invites?.filter((el) => el.status === "EXPECTATION") || [];
  const lengthInvites: number = experationInvites?.length || 0;
  const { user } = useAuth();
  if (!user) {
    return <></>;
  }
  return (
    <>
      <div>
        <Menu.Button className="relative bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none">
          <span className="sr-only">View notifications</span>
          <BellIcon className="h-6 w-6" aria-hidden="true" />
          {lengthInvites > 0 ? (
            <span className="inline-block absolute bg-red-600 pb-0.5 text-xs box-border w-4 h-4 bottom-4 right-0 flex items-center justify-center rounded-full">
              {lengthInvites}
            </span>
          ) : (
            ""
          )}
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="origin-top-right absolute right-0 mt-2 w-96 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10 max-h-96 overflow-y-auto">
          <InviteList.Invite
            lengthInvites={lengthInvites}
            experationInvites={experationInvites}
            declineInvite={declineInvite}
            acceptInvite={acceptInvite}
          />
        </Menu.Items>
      </Transition>
    </>
  );
};

InviteList.Invite = ({
  experationInvites,
  declineInvite,
  acceptInvite,
  lengthInvites,
}: {
  acceptInvite: (id: number) => void;
  declineInvite: (id: number) => void;
  experationInvites: UserInvitesQuery["myInvites"];
  lengthInvites: number;
}) => {
  return (
    <>
      {lengthInvites > 0 ? (
        experationInvites?.map((item, index: number) => {
          return (
            <Menu.Item key={index.toString()}>
              <div
                className={`p-3 bg-white ${
                  experationInvites.length - 1 === index
                    ? ""
                    : "border-b border-gray-300"
                }`}
              >
                <div className="flex justify-start mb-2">
                  <div className="border border-gray-300 rounded-full mr-2">
                    <UserAvatar className="h-10 w-10 rounded-full bg-white" />
                  </div>
                  <div>
                    <p className="font-medium leading-tight text-gray-700">
                      {`${item.from.firstName} ${item.from.lastName}`}
                    </p>
                    <span className="block leading-tight text-gray-500">
                      Hey! I invite you to my buylist {`"${item.buylist.name}"`}
                    </span>
                  </div>
                </div>
                <div className="block w-full mt-3 text-right">
                  <button
                    onClick={() => declineInvite(item.id)}
                    className="mr-2 py-2 px-4 bg-white hover:bg-gray-100 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-indigo-500 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg"
                  >
                    Ignore
                  </button>
                  <button
                    onClick={() => acceptInvite(item.id)}
                    className="py-2 px-4 bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
                  >
                    Approve
                  </button>
                </div>
              </div>
            </Menu.Item>
          );
        })
      ) : (
        <div>
          <section className="max-w-lg px-4 py-5 mx-auto space-y-1 text-center">
            <h2 className="text-lg font-medium text-gray-800">
              There are no new invitations
            </h2>
            <p className="text-gray-600">Your invitations will be here</p>
          </section>
        </div>
      )}
    </>
  );
};

export default InviteList;
