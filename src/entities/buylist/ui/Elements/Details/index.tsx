import { BuylistProps } from "entities/buylist/lib/buylist.types";
import DetailsStatus from "./components/DetailsStatus";

const Details = ({ buylist, editable }: BuylistProps) => {
  return (
    <div className="bg-white rounded w-full">
      <DetailsStatus status={buylist.status} editable={editable} />
      <div className="mx-2 bg-white rounded">
        <div className="flex-col">
          <div className="flex-col mt-3 rounded">
            <div className="py-1 px-1 text-gray-700 rounded text-xs font-semibold antialiased tracking-normal">
              Owner
            </div>
            <div className="flex px-2 py-2 hover:bg-gray-200">
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
