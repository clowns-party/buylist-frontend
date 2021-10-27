import { Disclosure, Menu, Transition } from "@headlessui/react";
import { UserIcon } from "@heroicons/react/outline";
import classNames from "classnames";
import Link from "next/link";
import React, { Fragment } from "react";
import { Routes } from "shared/routes";
import { GetProfileQuery } from "../../../../features/profile/queries/getProfile.query.generated";
import Button from "../../../../shared/ui/Button";

interface Props {
  logout: () => void;
  user: GetProfileQuery["profile"] | undefined;
}

const makeUserLinks = (logout: Props["logout"]) => {
  return [
    { name: "Your Profile", href: "#" },
    { name: "Settings", href: "#" },
    { name: "Sign out", href: "#", fn: logout },
  ];
};

const UserNavigation = ({ logout, user }: Props) => {
  const userNavigation = makeUserLinks(logout);
  if (!user) {
    return (
      <Link href={Routes.signin}>
        <a href={Routes.signin}>
          <Button>Sign in</Button>
        </a>
      </Link>
    );
  }
  return (
    <>
      <div>
        <Menu.Button className="max-w-xs bg-gray-800 rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
          <span className="sr-only">Open user menu</span>

          <UserIcon className="h-10 w-10 rounded-full bg-white p-2" />
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
        <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
          {userNavigation.map((item) => (
            <Menu.Item key={item.name}>
              {({ active }) => (
                <a
                  href={item.href}
                  onClick={() => {
                    if (item?.fn) {
                      item.fn();
                    }
                  }}
                  className={classNames(
                    active ? "bg-gray-100" : "",
                    "block px-4 py-2 text-sm text-gray-700"
                  )}
                >
                  {item.name}
                </a>
              )}
            </Menu.Item>
          ))}
        </Menu.Items>
      </Transition>
    </>
  );
};

UserNavigation.Mobile = ({ logout, user }: Props) => {
  const userNavigation = makeUserLinks(logout);
  if (!user) {
    return (
      <Link href={Routes.signin}>
        <a href={Routes.signin}>
          <Button>Sign in</Button>
        </a>
      </Link>
    );
  }
  return (
    <>
      {userNavigation.map((item) => (
        <Disclosure.Button
          key={item.name}
          as="a"
          href={item.href}
          className="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700"
        >
          {item.name}
        </Disclosure.Button>
      ))}
    </>
  );
};

export default UserNavigation;
