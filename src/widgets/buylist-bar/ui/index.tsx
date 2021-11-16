import { useAuth } from "features/auth/lib/hooks/useAuth";
import { useGetMyBuylistsQuery } from "features/buylist/queries/getMyBuylists.query.generated";
import { useMemo } from "react";
import React from "react";
import { BuylistBarFilters, BuylistBarItem } from "..";
import { useStoreBuylistBar } from "../model/store";
import { filtersBuylist } from "../lib/filtersBuylist";

const BuylistBar = () => {
  const { order, filter, search } = useStoreBuylistBar((state) => ({
    order: state.order,
    filter: state.filter,
    search: state.search,
  }));
  const { user, loading, logout } = useAuth();
  const { data, error } = useGetMyBuylistsQuery({
    skip: !user,
  });

  const buylistsRaw = data?.myBuylists?.length ? data?.myBuylists : null;
  const sorted = useMemo(() => {
    const filterSort = filtersBuylist(filter, order);
    return (buylistsRaw && [...buylistsRaw]?.sort(filterSort)) ?? [];
  }, [buylistsRaw, filter, order]);

  const buylists = useMemo(
    () =>
      search?.length
        ? sorted?.filter(
            (el) => el?.name?.toLowerCase()?.indexOf(search?.toLowerCase()) > -1
          )
        : sorted,
    [search, sorted]
  );

  return (
    <div className="mr-10 h-full" style={{ width: 400 }}>
      <div className="text-2xl mt-3 text-black font-semibold antialiased tracking-normal">
        All Buylists
      </div>
      <div className="flex mt-5 w-full">
        <BuylistBarFilters.Search />
      </div>
      <div className="bg-gray-100 mt-4 rounded">
        <BuylistBarFilters />
        {buylists?.length ? (
          buylists.map((buylist, index) => (
            <BuylistBarItem key={index} buylist={buylist} />
          ))
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default BuylistBar;
