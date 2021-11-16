import { BuylistBarState } from "../model/state";
import { GetMyBuylistsQuery } from "./../../../features/buylist/queries/getMyBuylists.query.generated";
type Buylist = GetMyBuylistsQuery["myBuylists"][0];

export const filtersBuylist = (
  filter: BuylistBarState["filter"],
  order: BuylistBarState["order"]
) => {
  return (a: Buylist, b: Buylist) => {
    if (filter === "status") {
      if (a.status < b.status) {
        return -1;
      }
      if (a.status > b.status) {
        return 1;
      }
    }
    return order === "asc" ? 0 : -1;
  };
};
