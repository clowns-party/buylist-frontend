import { BuylistProps } from "entities/buylist/lib/buylist.types";
import { FC } from "react";
import Products from "./Products";
import Nav from "./Nav";
import BuylistInfo from "./Info";
import Details from "./Details";

const BuylistElements: FC<BuylistProps> = (props) => {
  return (
    <div className="w-full relative">
      <Nav name={props?.buylist?.name} owner={props?.buylist?.owner} />
      <div className="flex overflow-auto h-screen">
        <div className="mr-10 flex-auto">
          <div className="flex justify-between">
            <div className="flex flex-auto">
              <BuylistInfo {...props} />
            </div>
            <div>
              <Details {...props} />
            </div>
          </div>
          <Products
            products={props?.buylist?.products}
            editable={props.editable}
          />
        </div>
      </div>
    </div>
  );
};

export default BuylistElements;
