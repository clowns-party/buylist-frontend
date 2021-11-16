import { GetBuylistByIdQuery } from "entities/buylist/model/queries/buylistById.query.generated";
import { BuylistCard } from "entities/buylist/ui";
import { FC } from "hoist-non-react-statics/node_modules/@types/react";
import { GetServerSideProps } from "next";

import Head from "next/head";
import { getBuylistByIdSSR } from "entities/buylist/model/serverside";
import { Container } from 'shared/ui';

type Props = {
  buylist: GetBuylistByIdQuery["buylist"];
};
const BuylistPage: FC<Props> = ({ buylist }) => {
  if (!buylist) {
    return <h2>no found!</h2>;
  }
  return (
    <Container>
      <Head>
        <title>Buylist | {buylist?.name}</title>
      </Head>
      <BuylistCard buylist={buylist} withListBar/>
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
