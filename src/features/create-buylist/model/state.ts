import { CreateBuylistInput, Statuses } from "types/types.generated";
import { GetState, SetState } from "zustand/vanilla";

export enum CreateBuylistSteps {
  Buylist = "Buylist",
  Products = "Products",
  Final = "Final",
}

export interface CreateBuylistState {
  products: { id: number }[];
  addProduct: () => void;
  removeProduct: (id: number) => void;
  step: CreateBuylistSteps;
  setStep: (step: CreateBuylistSteps) => void;
  form: CreateBuylistInput;
  setForm: (formData: CreateBuylistInput) => void;
}

type State = (
  set: SetState<CreateBuylistState>,
  get: GetState<CreateBuylistState>
) => CreateBuylistState;

const state: State = (set, get) => ({
  products: [{ id: 1 }, { id: 2 }],
  addProduct: () => {
    const products = get().products;
    const last = products[0]?.id || 0;
    set({ products: [...products, { id: last + 1 }] });
  },
  removeProduct: (id) => {
    const products = get().products;
    const removed = products.filter((product) => product.id !== id);
    set({ products: removed });
  },
  step: CreateBuylistSteps.Products,
  setStep: (step) => {
    set({ step });
  },
  form: {
    name: "",
    description: "",
    status: Statuses.Created,
    totalPrice: 0,
  },
  setForm: (form) => {
    set({ form });
  },
});

export default state;
