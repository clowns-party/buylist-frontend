import { BuylistProps } from "entities/buylist/lib/buylist.types";
import { ProductCard } from "entities/product";
import { Button, Container } from "shared/ui";
import { BuylistDetails, BuylistNav } from "..";
import BuylistInfo from "./components/Info";

const Card = ({ buylist }: BuylistProps) => {
  return (
    <Container.Bordered>
      <div className="flex w-100 h-screen">
        {/* <ListBar /> */}

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

export default Card;
