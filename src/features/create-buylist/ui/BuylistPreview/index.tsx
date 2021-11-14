import { BuylistCard } from "entities/buylist/ui";
import { useAuth } from "features/auth/lib/hooks/useAuth";
import { useStoreCreateBuylist } from "features/create-buylist/hooks";
import { MockedBuylist } from "features/create-buylist/lib/types";
import { Button, Container } from "shared/ui";

const BuylistPreview = () => {
  const products = useStoreCreateBuylist((state) => state.products);
  const form = useStoreCreateBuylist((state) => state.form);
  const { user } = useAuth();
  const buylist: MockedBuylist = {
    description: form?.description,
    id: 1,
    members: user ? [user] : [],
    name: form?.name,
    owner: user,
    ownerId: user?.id,
    products,
    status: form?.status,
    totalPrice: form?.totalPrice,
  };
  return (
    <div>
      <Container.Bordered>
        <article className="prose lg:prose-xl">
          <h1>Below is a preview of your buylist</h1>
          <p>If all the fields are correct, confirm the creation.</p>
        </article>
        <Button>Create</Button>
      </Container.Bordered>
      <BuylistCard buylist={buylist} />
    </div>
  );
};

export default BuylistPreview;
