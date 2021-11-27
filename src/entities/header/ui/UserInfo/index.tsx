import { Menu } from "@headlessui/react";
import { BellIcon, UserIcon } from "@heroicons/react/outline";
import { GetProfileQuery } from "../../../../features/profile/queries/getProfile.query.generated";

const UserInfo = ({
  user,
}: {
  user: GetProfileQuery["profile"] | undefined;
}) => {
  if (!user) {
    return <></>;
  }
  return (
    <div className="flex items-center px-5">
      <div className="flex-shrink-0">
        <img
          className="h-10 w-10 rounded-full bg-white p-2"
          src="https://tailwind-css-components.appseed.us/placeholders/pictures/male_avatar.svg"
          alt=""
        />
        {/* <UserIcon className="h-10 w-10 rounded-full bg-white p-2" /> */}
      </div>
      <div className="ml-3">
        <div className="text-base font-medium leading-none text-white">
          {user?.firstName} {user?.lastName}
        </div>
        <div className="text-sm font-medium leading-none text-gray-400">
          {user?.email}
        </div>
      </div>
      <button
        type="button"
        className="ml-auto bg-gray-800 flex-shrink-0 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
      >
        <span className="sr-only">View notifications</span>
        <BellIcon className="h-6 w-6" aria-hidden="true" />
      </button>
    </div>
  );
};

export default UserInfo;
