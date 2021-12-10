/* eslint-disable @next/next/no-img-element */
import { Disclosure, Menu } from "@headlessui/react";
import { MenuIcon, XIcon } from "@heroicons/react/outline";
import classNames from "classnames";
import { useInvites } from "entities/invites/hooks/useInvites";
import { Routes } from "shared/routes";
import { useAuth } from "../../../features/auth/lib/hooks/useAuth";
import InviteList from "../../invites/ui/InviteList";
import UserInfo from "./UserInfo";
import UserNavigation from "./UserNavigation";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Header() {
  const { invites, acceptInvite, declineInvite } = useInvites();
  const { logout, user } = useAuth();
  const { pathname } = useRouter();
  let navigation = [
    { name: "Main", href: Routes.home, current: pathname === Routes.home },
  ];
  if (user) {
    navigation = [
      ...navigation,
      {
        name: "Create buylist",
        href: Routes.createBuylist,
        current: pathname.includes(Routes.createBuylist),
      },
      {
        name: "Profile",
        href: Routes.profile,
        current: pathname.includes(Routes.profile),
      },
    ];
  }

  return (
    <>
      <div className="fixed top-0 w-full z-50">
        <Disclosure as="nav" className="bg-gray-800">
          {({ open }) => (
            <>
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <img
                        className="h-8 w-8"
                        src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"
                        alt="Workflow"
                      />
                    </div>
                    <div className="hidden md:block">
                      <div className="ml-10 flex items-baseline space-x-4">
                        {navigation.map((item) => (
                          <Link key={item.name} href={item.href}>
                            <a
                              href={item.href}
                              className={classNames(
                                item.current
                                  ? "bg-gray-900 text-white"
                                  : "text-gray-300 hover:bg-gray-700 hover:text-white",
                                "px-3 py-2 rounded-md text-sm font-medium"
                              )}
                              aria-current={item.current ? "page" : undefined}
                            >
                              {item.name}
                            </a>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="hidden md:block">
                    <div className="ml-4 flex items-center md:ml-6">
                      {/* Notification dropdown */}
                      <Menu as="div" className="ml-3 relative">
                        <InviteList
                          invites={invites}
                          acceptInvite={acceptInvite}
                          declineInvite={declineInvite}
                        />
                      </Menu>
                      {/* Profile dropdown */}
                      <Menu as="div" className="ml-3 relative">
                        <UserNavigation logout={logout} user={user} />
                      </Menu>
                    </div>
                  </div>
                  <div className="-mr-2 flex md:hidden">
                    {/* Mobile menu button */}
                    <Disclosure.Button className="bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                      <span className="sr-only">Open main menu</span>
                      {open ? (
                        <XIcon className="block h-6 w-6" aria-hidden="true" />
                      ) : (
                        <MenuIcon
                          className="block h-6 w-6"
                          aria-hidden="true"
                        />
                      )}
                    </Disclosure.Button>
                  </div>
                </div>
              </div>

              <Disclosure.Panel className="md:hidden">
                <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                  {navigation.map((item) => (
                    <Disclosure.Button
                      key={item.name}
                      as="a"
                      href={item.href}
                      className={classNames(
                        item.current
                          ? "bg-gray-900 text-white"
                          : "text-gray-300 hover:bg-gray-700 hover:text-white",
                        "block px-3 py-2 rounded-md text-base font-medium"
                      )}
                      aria-current={item.current ? "page" : undefined}
                    >
                      {item.name}
                    </Disclosure.Button>
                  ))}
                </div>
                <div className="pt-4 pb-3 border-t border-gray-700">
                  <UserInfo user={user} />
                  <div className="mt-3 px-2 space-y-1">
                    <UserNavigation.Mobile logout={logout} user={user} />
                  </div>
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      </div>
      <div className="mb-16"></div>
    </>
  );
}
