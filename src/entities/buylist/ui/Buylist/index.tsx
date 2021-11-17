import { BuylistProps } from "entities/buylist/lib/buylist.types";
import React, { FC } from "react";
import { Container } from "shared/ui";
import { BuylistBar } from "widgets/buylist-bar";
import BuylistElements from "../Elements";

type Props = {
  withListBar?: boolean;
} & BuylistProps;
const Buylist: FC<Props> = ({ buylist, editable = false, withListBar }) => {
  return (
    <Container.Bordered>
      <div className="flex w-100 h-screen overflow-hidden ">
        {withListBar && <BuylistBar />}

        <BuylistElements buylist={buylist} editable={editable} />
      </div>
    </Container.Bordered>
  );
};

export default Buylist;
