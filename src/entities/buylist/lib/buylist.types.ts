import { MockedBuylist } from "features/create-buylist/lib/types";
import { Buylist } from "types/types.generated";
import { GetBuylistByIdQuery } from "../model/queries/buylistById.query.generated";

export type BuylistProps = {
  buylist: Buylist | MockedBuylist | GetBuylistByIdQuery["buylist"];
};
