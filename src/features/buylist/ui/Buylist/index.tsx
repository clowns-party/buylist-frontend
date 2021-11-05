import { ProductCard } from "entities/product";
import { MockedBuylist } from "features/create-buylist/lib/types";
import { Button } from "shared/ui";
import { Buylist as BuylistType } from "types/types.generated";

type Props = {
  buylist: BuylistType | MockedBuylist;
};
const Buylist = ({ buylist }: Props) => {
  return (
    <Buylist.Container>
      <div className="flex w-100 h-screen">
        {/* <ListBar /> */}

        <div className="w-full relative">
          <Buylist.Header name={buylist?.name} owner={buylist?.owner} />
          <div className="flex overflow-auto h-screen">
            <div className="mr-10" style={{ width: 458 }}>
              <div className="w-full px-2 hover:bg-blue-100 py-2 text-2xl font-semibold">
                Project & Company Slug
              </div>
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
              <div className="flex-col p-2 rounded hover:bg-gray-200">
                <div className="flex">
                  <div className="text-sm ml-1 text-gray-800 antialiased tracking-normal font-normal ">
                    {buylist.description || "-"}
                  </div>
                </div>
              </div>

              <div className="items-center py-1 mt-5 text-sm font-medium text-gray-800">
                Activity
              </div>
              <div className="flex p-2 rounded">
                <div className="flex">
                  <div className="text-sm ml-1 py-1 text-gray-800 antialiased tracking-normal font-normal ">
                    Show :
                  </div>
                  <div className="text-sm ml-2 py-1 cursor-pointer rounded px-2 text-white bg-gray-700 antialiased tracking-normal font-normal ">
                    Comments
                  </div>
                  <div className="text-sm ml-2 py-1 cursor-pointer rounded px-2 text-gray-800 bg-gray-200 antialiased tracking-normal font-normal ">
                    Products
                  </div>
                </div>
              </div>
              <div className="border mt-3"></div>
              <div className="items-center flex py-1 mt-5 text-sm font-medium text-gray-800 flex-col">
                {buylist?.products?.map((product) => (
                  <ProductCard product={product} key={product?.id} />
                ))}
                <Button className="mt-12">Create now product</Button>
              </div>
            </div>
            <div className="bg-white rounded" style={{ width: 240 }}>
              <div className=" px-1 text-center items-center">
                <div className="flex w-32 px-3 py-2 self-center text-sm font-medium antialiased rounded bg-blue-800 text-white">
                  <a href="#" className="">
                    {buylist?.status}
                  </a>
                  <svg
                    className="h-4 w-4 mt-1 ml-1"
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
          </div>
        </div>
      </div>
    </Buylist.Container>
  );
};

Buylist.Container = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative py-10">
      <div className="relative px-4 py-10 bg-white mx-8 md:mx-0 shadow rounded-3xl sm:p-10">
        {children}
      </div>
    </div>
  );
};

Buylist.Header = ({
  owner,
  name,
}: Pick<Props["buylist"], "name" | "owner">) => {
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
      <div className="flex mr-6">
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
      </div>
    </div>
  );
};

export default Buylist;
