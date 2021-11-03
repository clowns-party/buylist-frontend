import create from "zustand";
import { devtools } from "zustand/middleware";
import createVanilla from "zustand/vanilla";
import state, { CreateBuylistState } from "./state";

// store for usage outside of react
export const createBuylistStore = createVanilla<CreateBuylistState>(
  devtools(state, "create-buylist")
);

// store for usage inside of react
export const useStoreCreateBuylist =
  create<CreateBuylistState>(createBuylistStore);
