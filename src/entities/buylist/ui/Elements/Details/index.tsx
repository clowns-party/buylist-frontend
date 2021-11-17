import { BuylistProps } from "entities/buylist/lib/buylist.types";
import { useState } from "react";
import { Dropdown } from "shared/ui";
import { Statuses } from "types/types.generated";

const Details = ({ buylist, editable }: BuylistProps) => {
  const [status, setStatus] = useState("");
  const onSelect = (status: string) => {
    setStatus(status);
  };
  const items = Object.keys(Statuses).map((status) => ({
    title: status,
  }));
  return (
    <div className="bg-white rounded" style={{ width: 240 }}>
      <div className=" px-1 text-center items-center justify-end flex">
        <Dropdown
          items={items}
          classNameItemsWrap="w-28"
          onSelect={onSelect}
          active={status || buylist?.status}
        >
          <div className="flex w-32 px-3 py-2 self-center items-center justify-between text-sm font-medium antialiased rounded bg-blue-800 text-white">
            <a href="#">{buylist?.status}</a>
            <svg
              className="h-4 w-4 ml-1 cursor-pointer"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M4.516 7.548c.436-.446 1.043-.481 1.576 0L10 11.295l3.908-3.747c.533-.481 1.141-.446 1.574 0 .436.445.408 1.197 0 1.615-.406.418-4.695 4.502-4.695 4.502a1.095 1.095 0 01-1.576 0S4.924 9.581 4.516 9.163c-.409-.418-.436-1.17 0-1.615z"
              />
            </svg>
          </div>
        </Dropdown>
      </div>
      <div className="mx-2 bg-white rounded">
        <div className="flex-col">
          <div className="flex-col mt-3 rounded">
            <div className="py-1 px-1 text-gray-700 rounded text-xs font-semibold antialiased tracking-normal">
              Owner
            </div>
            <div className="flex px-2 py-2 hover:bg-gray-200">
              <img
                className="w-6 h-6 rounded-full"
                src="https://media-exp1.licdn.com/dms/image/C4E03AQH1yPpzWPPbwA/profile-displayphoto-shrink_100_100/0/1597572102197?e=1616630400&v=beta&t=bKny37OM7-qwl1IyJQNjKOj7wSeBmDE8ScYAto5Ul3s"
                alt=""
              />

              <div className="font-normal text-gray-700 ml-3 text-xs">
                {buylist?.owner?.firstName}
                {buylist?.owner?.lastName}
              </div>
            </div>
          </div>
          <div className="flex-col mt-3 rounded">
            <div className="py-1 px-1 text-gray-700 rounded text-xs font-semibold antialiased tracking-normal">
              Members
            </div>
            <div className="flex px-2 py-2 hover:bg-gray-200">
              <img
                className="w-6 h-6 rounded-full"
                src="https://media-exp1.licdn.com/dms/image/C4E35AQFvDRbBk0Ousw/profile-framedphoto-shrink_400_400/0/1610941682185?e=1611381600&v=beta&t=W-wz9MDSoHzY8ApKoSKoSCW41lsP98UqsvjtitjBnQ4"
                alt=""
              />
              <div className="font-normal text-gray-700 ml-3 text-xs">
                {buylist?.members?.length}
              </div>
            </div>
          </div>
          <div className="flex-col mt-3 rounded">
            <div className="py-1 px-1 text-gray-700 rounded text-xs font-semibold antialiased tracking-normal">
              Type
            </div>
            <div className="flex px-2 py-2 hover:bg-gray-200">
              <div className="font-normal text-gray-700 ml-3 text-xs">
                Private
              </div>
            </div>
          </div>
          <div className="border mt-2"></div>
        </div>
      </div>
      <div className="flex justify-between px-1 text-left ">
        <div className="p-2 text-xs text-gray-600 antialiased tracking-normal">
          Created {new Date().toISOString()}
          <br />
        </div>
      </div>
    </div>
  );
};

export default Details;
