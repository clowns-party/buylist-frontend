import { GetMyBuylistsQuery } from "./queries/getMyBuylists.query.generated";

export type MyBuylists = GetMyBuylistsQuery["myBuylists"];
export { useGetMyBuylistsQuery } from "./queries/getMyBuylists.query.generated";
