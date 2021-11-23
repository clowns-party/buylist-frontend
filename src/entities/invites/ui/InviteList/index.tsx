import { Menu, Transition } from "@headlessui/react";
import { BellIcon, UserIcon } from "@heroicons/react/outline";
import classNames from "classnames";
import React, { Fragment } from "react";
import { Button } from "shared/ui";

const InviteList = () => {
  const inviteItems = [1, 2];
  return (
    <>
      <div>
        <Menu.Button className="bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
          <span className="sr-only">View notifications</span>

          <BellIcon className="h-6 w-6" aria-hidden="true" />
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
        <Menu.Items className="origin-top-right absolute right-0 mt-2 w-96 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
          {inviteItems.map((item: any, index: number) => (
            <Menu.Item key={item.name}>
              <div
                className={`p-3 bg-white ${
                  inviteItems.length - 1 === index
                    ? ""
                    : "border-b border-gray-300"
                }`}
              >
                <div className="flex justify-start mb-2">
                  <div className="border border-gray-300 rounded-full mr-2">
                    <UserIcon className="h-10 w-10 rounded-full bg-white p-2" />
                  </div>
                  <div>
                    <p className="font-medium leading-tight text-gray-700">
                      John Doe
                    </p>
                    <span className="block leading-tight text-gray-500">
                      Hey! I invite you to my buylist {`"Name"`}
                    </span>
                  </div>
                </div>
                <div className="block w-full mt-3 text-right">
                  <button className="mr-2 py-2 px-4 bg-white hover:bg-gray-100 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-indigo-500 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg">
                    Ignore
                  </button>
                  <button className="py-2 px-4 bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg ">
                    Approve
                  </button>
                </div>
              </div>
            </Menu.Item>
          ))}
        </Menu.Items>
      </Transition>
    </>
  );
};

export default InviteList;
