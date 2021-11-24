import { useAuth } from "features/auth/lib/hooks/useAuth";
import { useGetMyBuylistsQuery } from "widgets/buylists-my/model/queries/getMyBuylists.query.generated";
import { useMemo } from "react";
import React from "react";
import { BuylistBarFilters, BuylistBarItem } from "..";
import { useStoreBuylistBar } from "../model/store";
import { filtersBuylist } from "../lib/filtersBuylist";
import { Hamburger } from "shared/icons";
import { useState } from "react";
import styled from "styled-components";

const BuylistBar = () => {
  const [show, setShow] = useState(false);
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

  const toggle = () => {
    setShow(!show);
  };

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
    <div>
      <div className="text-2xl text-black font-semibold antialiased tracking-normal flex items-center py-5">
        <Hamburger className="h-6 w-6 cursor-pointer" onClick={toggle} />
      </div>

      {show && (
        <Wrapper className="h-full">
          <div className="flex mt-5 w-full pb-4">
            <BuylistBarFilters.Search />
          </div>
          <div
            className="bg-gray-100 rounded overflow-y-auto max-h-screen pb-10 absolute top 0 z-10 w-full"
            style={{ paddingBottom: 162 }}
          >
            <BuylistBarFilters />
            {buylists?.length ? (
              buylists.map((buylist, index) => (
                <BuylistBarItem key={index} buylist={buylist} />
              ))
            ) : (
              <>
                <h2>no results</h2>
              </>
            )}
          </div>
        </Wrapper>
      )}
    </div>
  );
};

const Wrapper = styled.div`
  position: absolute;
  z-index: 10;
  width: 100%;
  background: white;
  margin-right: 10px;
  @media (min-width: 991.98px) {
    position: relative;
    width: 270px;
  }
`;

export default BuylistBar;
