import { ProductCard } from "entities/product";
import { useAuth } from "features/auth/lib/hooks/useAuth";
import { Buylist } from "features/buylist/ui";
import { useStoreCreateBuylist } from "features/create-buylist/hooks";
import { MockedBuylist } from "features/create-buylist/lib/types";
import { Buylist as BuylistType } from "types/types.generated";

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
      <Buylist buylist={buylist} />
    </div>
  );
};

export default BuylistPreview;
