import { GetServerSidePropsContext } from "next";
import client, { getToken } from "../../../../../apollo/client";
import {
  GetBuylistByIdDocument,
  GetBuylistByIdQuery,
  GetBuylistByIdQueryVariables,
} from "../queries/buylistById.query.generated";

export const getBuylistByIdSSR = async (context: GetServerSidePropsContext) => {
  const { query } = context;
  const id = Number(query?.id);
  const token = getToken(context);
  const apollo = client(token, {});
  const buylist = await apollo.query<
    GetBuylistByIdQuery,
    GetBuylistByIdQueryVariables
  >({
    query: GetBuylistByIdDocument,
    variables: {
      id,
    },
  });
  return buylist;
};
