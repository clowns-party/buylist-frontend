import {
  GetBuylistByIdQuery,
  useGetBuylistByIdQuery,
} from "entities/buylist/model/queries/buylistById.query.generated";
import { Buylist } from "entities/buylist/ui";
import { FC } from "react";
import { GetServerSideProps } from "next";

import Head from "next/head";
import { getBuylistByIdSSR } from "entities/buylist/model/serverside";
import { Container } from "shared/ui";
import { useRouter } from "next/router";

type Props = {
  buylist: GetBuylistByIdQuery["buylist"];
};
const BuylistPage: FC<Props> = ({ buylist }) => {
  const { query } = useRouter();
  const id = query?.id?.toString();

  // TODO maybe subscription? this only for refetcher!
  const { data: updated } = useGetBuylistByIdQuery({
    variables: { id: Number(id) },
  });

  if (!buylist) {
    return <h2>no found!</h2>;
  }
  return (
    <Container>
      <Head>
        <title>Buylist | {buylist?.name}</title>
      </Head>
      <Buylist buylist={updated?.buylist || buylist} withListBar editable />
    </Container>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const buylist = await getBuylistByIdSSR(context);

  return {
    props: {
      buylist: buylist.data.buylist,
    },
  };
};

export default BuylistPage;
