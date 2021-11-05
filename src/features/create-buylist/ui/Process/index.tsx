import { useStoreCreateBuylist } from "features/create-buylist/hooks";
import { CreateBuylistSteps } from "features/create-buylist/model";
import { ProgressBar } from "shared/ui";
import { ProgressSteps } from "shared/ui/ProgressBar";
import { CreateBuylistForm, CreateProductsForm } from "..";
import BuylistPreview from "../BuylistPreview";

const Process = () => {
  const step = useStoreCreateBuylist((state) => state.step);
  const setStep = useStoreCreateBuylist((state) => state.setStep);
  const steps: ProgressSteps[] = [
    {
      percent: 0,
      step: Number(CreateBuylistSteps.Buylist),
      currentStep: step,
    },
    {
      percent: 0,
      step: Number(CreateBuylistSteps.Products),
      currentStep: step,
    },
    {
      percent: 0,
      step: Number(CreateBuylistSteps.Preview),
      currentStep: step,
    },
  ];

  const onChangeStep = (step: CreateBuylistSteps) => {
    setStep(step);
  };

  return (
    <div className="relative">
      <ProgressBar steps={steps} onChangeStep={onChangeStep} />
      {step === CreateBuylistSteps.Buylist && <CreateBuylistForm />}
      {step === CreateBuylistSteps.Products && <CreateProductsForm />}
      {step === CreateBuylistSteps.Preview && <BuylistPreview />}
    </div>
  );
};

export default Process;
