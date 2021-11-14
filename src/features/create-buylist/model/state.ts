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
  // newProduct: Omit<MockedProduct, "id">
  addProduct: () => void;
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

export const initialProduct: MockedProduct = {
  id: 0,
  comment: "",
  price: 0,
  buyBefore: "",
  color: "indigo-500",
  coordinate: undefined,
  link: "",
  imageUrl: "",
  name: "My product",
};

const state: State = (set, get) => ({
  products: [initialProduct],
  addProduct: () => {
    const products = get().products;
    const last = products[products?.length - 1]?.id || 0;
    const id = last + 1;
    set({
      products: [
        ...products,
        { ...initialProduct, name: initialProduct.name + id, id },
      ],
    });
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
        return [...products, product];
      },
      []
    );
    set({ products: productsUpdated });
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
