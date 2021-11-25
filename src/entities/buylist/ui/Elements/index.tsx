import { BuylistProps } from "entities/buylist/lib/buylist.types";
import { FC } from "react";
import Products from "./Products";
import Nav from "./Nav";
import BuylistInfo from "./Info";
import Details from "./Details";

const BuylistElements: FC<BuylistProps> = (props) => {
  return (
    <div className="w-full relative" key={props?.buylist?.id}>
      <Nav
        name={props?.buylist?.name}
        owner={props?.buylist?.owner}
        editable={props.editable}
        id={props.buylist.id}
      />
      <div className="flex overflow-auto h-screen">
        <div className="mr-10 flex-auto">
          <div className="flex justify-between flex-col sm:flex-row">
            <div className="flex flex-auto">
              <BuylistInfo {...props} />
            </div>
            <div className="flex flex-auto sm:flex-none">
              <Details {...props} />
            </div>
          </div>
          <div className="border mt-2"></div>
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
