import { useStoreCreateBuylist } from ".";
import { CreateBuylistSteps } from "../model";

export const useValidateBuylist = () => {
  const products = useStoreCreateBuylist((state) => state.products);
  const [form, setForm, setStep] = useStoreCreateBuylist((state) => [
    state.form,
    state.setForm,
    state.setStep,
  ]);

  const setStepForValidate = (step: CreateBuylistSteps) => {
    const validateBuylistForm = form?.name === "" || form?.description === "";
    const validateProductsForm = products?.some(
      (el) => el.name === "" || el.comment === ""
    );
    switch (step) {
      case 0:
        return false;
      case 1:
        return validateBuylistForm;
      case 2:
        return validateBuylistForm && validateProductsForm;
      default:
        return false;
    }
  };

  return { setStepForValidate };
};
