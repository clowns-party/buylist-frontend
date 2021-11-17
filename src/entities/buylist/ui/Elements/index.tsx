import { BuylistProps } from "entities/buylist/lib/buylist.types";
import { FC } from "react";
import Details from "./Details";
import Info from "./Info";
import Nav from "./Nav";

const BuylistElements: FC<BuylistProps> = ({ buylist, editable }) => {
  return (
    <div className="w-full relative">
      <Nav name={buylist?.name} owner={buylist?.owner} />
      <div className="flex overflow-auto h-screen">
        <Info buylist={buylist} editable={editable} />
        <Details buylist={buylist} editable={editable} />
      </div>
    </div>
  );
};

export default BuylistElements;
