import { BuylistProps } from "entities/buylist/lib/buylist.types";
import { Dropdown } from "shared/ui";

const Nav = ({
  owner,
  name,
}: Pick<BuylistProps["buylist"], "name" | "owner">) => {
  return (
    <div className="flex w-full justify-between px-1 text-center items-center">
      <div className="p-2 flex">
        <div className="py-3 cursor-pointer text-sm text-gray-600  font-normal antialiased tracking-normal">
          {owner?.email}/
        </div>
        <div className="flex ml-2 mt-3">
          <div className="bg-red-500 mt-1 rounded h-4 w-4 p-1">
            <svg
              className="h-2 w-2 text-white"
              fill="currentColor "
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 3a7 7 0 10.001 13.999A7 7 0 0010 3z"
              />
            </svg>
          </div>
          <div className="cursor-pointer ml-1 text-sm text-gray-600  font-normal antialiased tracking-normal">
            {name || "unnamed list"}
          </div>
        </div>
      </div>
      <div className="flex">
        <div className="p-2 rounded hover:bg-blue-100 text-blue-700">
          <svg
            className="h-5 w-5 "
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M10 4.4C3.439 4.4 0 9.232 0 10c0 .766 3.439 5.6 10 5.6 6.56 0 10-4.834 10-5.6 0-.768-3.44-5.6-10-5.6zm0 9.907c-2.455 0-4.445-1.928-4.445-4.307S7.545 5.691 10 5.691s4.444 1.93 4.444 4.309-1.989 4.307-4.444 4.307zM10 10c-.407-.447.663-2.154 0-2.154-1.228 0-2.223.965-2.223 2.154s.995 2.154 2.223 2.154c1.227 0 2.223-.965 2.223-2.154 0-.547-1.877.379-2.223 0z"
            />
          </svg>
        </div>
        <div className="p-2 rounded ml-2 hover:bg-blue-100 text-gray-700">
          <svg
            className="h-5 w-5 "
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M15 13.442c-.633 0-1.204.246-1.637.642l-5.938-3.463c.046-.188.075-.384.075-.584s-.029-.395-.075-.583L13.3 6.025A2.48 2.48 0 0015 6.7c1.379 0 2.5-1.121 2.5-2.5S16.379 1.7 15 1.7s-2.5 1.121-2.5 2.5c0 .2.029.396.075.583L6.7 8.212A2.485 2.485 0 005 7.537c-1.379 0-2.5 1.121-2.5 2.5s1.121 2.5 2.5 2.5a2.48 2.48 0 001.7-.675l5.938 3.463a2.339 2.339 0 00-.067.546A2.428 2.428 0 1015 13.442z"
            />
          </svg>
        </div>

        <Dropdown items={[{ title: "edit" }]} onSelect={() => {}}>
          <div className="p-2 rounded ml-2 hover:bg-blue-100 text-gray-700">
            <svg
              className="h-5 w-5 "
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10.001 7.8a2.2 2.2 0 100 4.402A2.2 2.2 0 0010 7.8zm-7 0a2.2 2.2 0 100 4.402A2.2 2.2 0 003 7.8zm14 0a2.2 2.2 0 100 4.402A2.2 2.2 0 0017 7.8z"
              />
            </svg>
          </div>
        </Dropdown>
      </div>
    </div>
  );
};

export default Nav;
