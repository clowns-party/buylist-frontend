/* eslint-disable react-hooks/rules-of-hooks */
import { useAuth } from "features/auth/lib/hooks/useAuth";
import { useMemo } from "react";
import Link from "next/link";
import React from "react";
import { useStoreMyBuylists } from "widgets/buylists-my/model/store";
import { EmptyList } from "..";
import { useGetMyBuylistsQuery } from "../../model/index";

export default function MyBuylists() {
  const search = useStoreMyBuylists((state) => state.search);
  const { user } = useAuth();

  const { data, error } = useGetMyBuylistsQuery({
    skip: !user,
  });
  const buylists = data?.myBuylists;
  const myBuylists = useMemo(
    () =>
      search?.length
        ? buylists?.filter(
            (el) => el?.name?.toLowerCase()?.indexOf(search?.toLowerCase()) > -1
          )
        : buylists,
    [search, buylists]
  );

  if (!buylists?.length) {
    return <EmptyList />;
  }

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <MyBuylists.Label />
        <MyBuylists.Filters />
      </div>

      <div className="flex flex-col">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Total Price
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Status
                    </th>
                    <th scope="col" className="relative px-6 py-3">
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {myBuylists?.map((buylist) => (
                    <tr key={buylist.id}>
                      <Link href={`buylist/${buylist.id}`}>
                        <a href={`buylist/${buylist.id}`} className="contents">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">
                                  {buylist.name}
                                </div>
                                <div className="text-sm text-gray-500">
                                  {buylist.description}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                              {buylist?.totalPrice}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {buylist.status}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <a
                              href="#"
                              className="text-indigo-600 hover:text-indigo-900"
                            >
                              Edit
                            </a>
                          </td>
                        </a>
                      </Link>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

MyBuylists.Filters = () => {
  const setSearch = useStoreMyBuylists((state) => state.setSearch);
  return (
    <div className="text-end">
      <div className="flex flex-col md:flex-row md:w-full max-w-sm md:space-x-3 space-y-3 md:space-y-0 justify-center items-end">
        <div className=" relative ">
          <input
            type="text"
            id='"form-subscribe-Filter'
            className=" rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
            placeholder="name"
            onChange={({ target }) => {
              setSearch(target.value);
            }}
          />
        </div>
        <EmptyList.CreateNow />
      </div>
    </div>
  );
};

MyBuylists.Label = () => {
  return <h2 className="text-2xl leading-tight">My buylists</h2>;
};
