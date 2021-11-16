import { BuylistBar } from "widgets/buylist-bar";
import { BuylistProps } from "entities/buylist/lib/buylist.types";
import { FC } from "hoist-non-react-statics/node_modules/@types/react";
import { Container } from "shared/ui";
import { BuylistDetails, BuylistNav } from "..";
import BuylistInfo from "./components/Info";

type Props = {
  withListBar?: boolean;
} & BuylistProps;
const BuylistCard: FC<Props> = ({ buylist, withListBar }) => {
  return (
    <Container.Bordered>
      <div className="flex w-100 h-screen overflow-hidden ">
        {withListBar && <BuylistBar />}

        <div className="w-full relative">
          <BuylistNav name={buylist?.name} owner={buylist?.owner} />
          <div className="flex overflow-auto h-screen">
            <BuylistInfo buylist={buylist} />
            <BuylistDetails buylist={buylist} />
          </div>
        </div>
      </div>
    </Container.Bordered>
  );
};

export default BuylistCard;
