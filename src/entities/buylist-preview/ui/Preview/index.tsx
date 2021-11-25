import AlertCard from "entities/alert-card/ui/AlertCard";
import { Buylist } from "entities/buylist/ui";
import { useAuth } from "features/auth/lib/hooks/useAuth";
import { useStoreCreateBuylist } from "features/create-buylist/hooks";
import {
  createBuylistResult,
  useCreateBuylist,
} from "features/create-buylist/hooks/useCreateBuylist";
import { MockedBuylist } from "features/create-buylist/lib/types";
import { useRouter } from "next/router";
import { useState } from "react";
import { Button, Container } from "shared/ui";

const BuylistPreview = () => {
  const router = useRouter();
  const products = useStoreCreateBuylist((state) => state.products);
  const form = useStoreCreateBuylist((state) => state.form);
  const [buylistId, setBuylistId] = useState(0);
  const { createBuylist, loading } = useCreateBuylist();
  const [openAlert, setOpenAlert] = useState(false);
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
  const createBuylistFunc = async () => {
    const result: createBuylistResult | undefined = await createBuylist();
    setBuylistId(result?.buylist_id || 0);
    setOpenAlert(true);
  };
  const closeModal = () => {
    setOpenAlert(false);
    router.push(`/profile`);
  };
  const openBuylistById = () => {
    router.push(`/buylist/${buylistId}`);
    setBuylistId(0);
  };
  return (
    <div>
      <AlertCard
        isOpen={openAlert}
        closeModal={closeModal}
        loading={loading}
        redirect={openBuylistById}
      />
      <Container.Bordered className="mb-14">
        <article className="prose lg:prose-xl">
          <div className="text-lg">Below is a preview of your buylist</div>
          <div className="text-lg">
            If all the fields are correct, confirm the creation.
          </div>
        </article>
        <Button
          className="mt-4"
          disabled={loading}
          onClick={() => {
            createBuylistFunc();
          }}
        >
          Create Buylist
        </Button>
      </Container.Bordered>
      <Buylist buylist={buylist} />
    </div>
  );
};

export default BuylistPreview;
