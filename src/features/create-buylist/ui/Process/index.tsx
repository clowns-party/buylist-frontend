import { useStoreCreateBuylist } from "features/create-buylist/hooks";
import { CreateBuylistSteps } from "features/create-buylist/model";
import { CreateBuylistForm, CreateProductsForm } from "..";

const Process = () => {
  const step = useStoreCreateBuylist((state) => state.step);
  if (step === CreateBuylistSteps.Buylist) {
    return <CreateBuylistForm />;
  }
  if (step === CreateBuylistSteps.Products) {
    return <CreateProductsForm />;
  }
  return <div></div>;
};

export default Process;
