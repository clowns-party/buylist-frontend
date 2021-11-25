import { BuylistProps } from "entities/buylist/lib/buylist.types";
import { EditableField } from "features/buylist-edit-field";
import { Tooltip } from "shared/ui";
import Activity from "./components/Activity";

const BuylistInfo = ({ buylist, editable }: BuylistProps) => {
  return (
    <>
      <div className="flex-auto">
        <EditableField
          editable={!!editable}
          value={buylist?.name}
          field="name"
          className="w-full px-2 py-2"
        >
          <Tooltip content="To edit, double-click">
            <div className="w-full px-2 hover:bg-blue-100 py-2 text-2xl font-semibold">
              {buylist?.name}
            </div>
          </Tooltip>
        </EditableField>
        <div className="flex mt-1">
          <div className="flex py-1 px-3 mr-2 cursor-pointer bg-gray-200 hover:bg-gray-300 rounded">
            <svg
              className="h-5 w-5 text-gray-700"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M5.602 19.8c-1.293 0-2.504-.555-3.378-1.44-1.695-1.716-2.167-4.711.209-7.116l9.748-9.87c.988-1 2.245-1.387 3.448-1.06 1.183.32 2.151 1.301 2.468 2.498.322 1.22-.059 2.493-1.046 3.493l-9.323 9.44c-.532.539-1.134.858-1.738.922-.599.064-1.17-.13-1.57-.535-.724-.736-.828-2.117.378-3.337l6.548-6.63c.269-.272.705-.272.974 0s.269.714 0 .986l-6.549 6.631c-.566.572-.618 1.119-.377 1.364.106.106.266.155.451.134.283-.029.606-.216.909-.521l9.323-9.439c.64-.648.885-1.41.69-2.145a2.162 2.162 0 00-1.493-1.513c-.726-.197-1.48.052-2.12.7l-9.748 9.87c-1.816 1.839-1.381 3.956-.209 5.143 1.173 1.187 3.262 1.629 5.079-.212l9.748-9.87a.683.683 0 01.974 0 .704.704 0 010 .987L9.25 18.15c-1.149 1.162-2.436 1.65-3.648 1.65z"
              />
            </svg>
            <div className="ml-2 text-sm text-gray-700  font-normal antialiased tracking-normal">
              Attach
            </div>
          </div>

          <div className="flex py-1 px-3 mr-1 cursor-pointer bg-gray-200 hover:bg-gray-300 rounded">
            <svg
              className="h-5 w-5 text-gray-700"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M7.859 14.691l-.81.805a1.814 1.814 0 01-2.545 0 1.762 1.762 0 010-2.504l2.98-2.955c.617-.613 1.779-1.515 2.626-.675a.992.992 0 101.397-1.407c-1.438-1.428-3.566-1.164-5.419.675l-2.98 2.956A3.719 3.719 0 002 14.244a3.72 3.72 0 001.108 2.658c.736.73 1.702 1.096 2.669 1.096s1.934-.365 2.669-1.096l.811-.805a.988.988 0 00.005-1.4.995.995 0 00-1.403-.006zm9.032-11.484c-1.547-1.534-3.709-1.617-5.139-.197l-1.009 1.002a.99.99 0 101.396 1.406l1.01-1.001c.74-.736 1.711-.431 2.346.197.336.335.522.779.522 1.252s-.186.917-.522 1.251l-3.18 3.154c-1.454 1.441-2.136.766-2.427.477a.99.99 0 10-1.396 1.406c.668.662 1.43.99 2.228.99.977 0 2.01-.492 2.993-1.467l3.18-3.153A3.732 3.732 0 0018 5.866a3.726 3.726 0 00-1.109-2.659z"
              />
            </svg>
            <div className="ml-2 text-sm text-gray-700  font-normal antialiased tracking-normal">
              Link Buylist
            </div>
          </div>
        </div>
        <div className="items-center py-1 mt-5 mb-1 text-sm font-medium text-gray-800">
          Description
        </div>
        <EditableField
          editable={!!editable}
          value={buylist?.description}
          field="description"
          className="flex-col p-2 rounded"
        >
          <div className="flex-col p-2 rounded hover:bg-gray-200">
            <div className="flex">
              <div className="text-sm ml-1 text-gray-800 antialiased tracking-normal font-normal ">
                {buylist.description || "-"}
              </div>
            </div>
          </div>
        </EditableField>

        <Activity />
        <div className="border mt-3 block sm:hidden"></div>
      </div>
    </>
  );
};

export default BuylistInfo;
