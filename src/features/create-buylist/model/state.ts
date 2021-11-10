import { CreateBuylistInput, Statuses } from "types/types.generated";
import { GetState, SetState } from "zustand/vanilla";
import { MockedProduct } from "../lib/types";

export enum CreateBuylistSteps {
  Buylist,
  Products,
  Preview,
  Final,
}

export interface CreateBuylistState {
  products: MockedProduct[];
  addProduct: (newProduct: Omit<MockedProduct, "id">) => void;
  removeProduct: (id: number) => void;
  updateProduct: (id: number, product: Omit<MockedProduct, "id">) => void;
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
  products: [
    {
      id: 0,
      comment: "",
      price: 0,
      buyBefore: "",
      color: "indigo-500",
      coordinate: undefined,
      link: "",
      imageUrl: "",
      name: "My product",
    },
  ],
  addProduct: (newProduct) => {
    const products = get().products;
    const last = products[0]?.id || 0;
    set({ products: [...products, { ...newProduct, id: last + 1 }] });
  },
  removeProduct: (id) => {
    const products = get().products;
    const removed = products.filter((product) => product.id !== id);
    set({ products: removed });
  },
  updateProduct: (id, fields) => {
    const products = get().products;
    const productsUpdated = products.reduce(
      (products: MockedProduct[], product: MockedProduct) => {
        if (product.id === id) {
          return [
            ...products,
            {
              ...product,
              ...fields,
            },
          ];
        }
        return products;
      },
      []
    );

    set({ products: productsUpdated });
  },
  step: CreateBuylistSteps.Preview,
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
