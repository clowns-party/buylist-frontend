import { GetMyBuylistsQuery } from "features/buylist/queries/getMyBuylists.query.generated";
import React from "react";
import { useRouter } from "next/router";
import { Routes } from "shared/routes";
import { Statuses } from "types/types.generated";
import { FC } from "react";
import Link from "next/link";

type Props = {
  buylist: GetMyBuylistsQuery["myBuylists"][0];
};

const BuylistBarItem: FC<Props> = ({ buylist }) => {
  const { query } = useRouter();
  const id = query?.id;
  const buylistEnded = buylist?.status === Statuses.Closed && "line-through";
  const selected = id?.toString() === buylist?.id?.toString() && "bg-blue-100";
  return (
    <div className="mx-2 bg-white rounded">
      <div className="overflow-auto flex-col" style={{ height: "auto" }}>
        <Link href={Routes.buylistById(buylist?.id?.toString())}>
          <a href={Routes.buylistById(buylist?.id?.toString())}>
            <div className={`flex-col cursor-pointer ${selected}`}>
              <div className="py-3 px-3 cursor-pointer text-gray-700 rounded text-sm font-normal antialiased tracking-normal">
                {buylist?.name}
              </div>
              <div className="flex px-3 justify-between">
                <div className="flex">
                  <div className="bg-red-500 rounded h-4 w-4 p-1">
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
                  <div
                    className={`font-bold ${buylistEnded} text-gray-500 ml-1 text-xs`}
                  >
                    {buylist?.status}
                  </div>
                </div>
                <button className="flex rounded-full p-1 pb-1 h-6 w-6 bg-orange-500 justify-around">
                  <span className="text-xs font-bold">AS</span>
                </button>
              </div>
              <div className="border mt-3"></div>
            </div>
          </a>
        </Link>
      </div>
    </div>
  );
};

export default BuylistBarItem;
