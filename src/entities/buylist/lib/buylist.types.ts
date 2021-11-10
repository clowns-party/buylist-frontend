import { MockedBuylist } from "features/create-buylist/lib/types";
import { Buylist } from "types/types.generated";

export type BuylistProps = {
  buylist: Buylist | MockedBuylist;
};
