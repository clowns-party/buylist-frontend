import create from "zustand";
import { devtools } from "zustand/middleware";
import createVanilla from "zustand/vanilla";
import state, { MyBuyliststState } from "./state";

// store for usage outside of react
export const myBuylistsStore = createVanilla<MyBuyliststState>(
  devtools(state, "my-buylists")
);

// store for usage inside of react
export const useStoreMyBuylists = create<MyBuyliststState>(myBuylistsStore);
