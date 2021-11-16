import create from "zustand";
import { devtools } from "zustand/middleware";
import createVanilla from "zustand/vanilla";
import state, { BuylistBarState } from "./state";

// store for usage outside of react
export const buylistBarStore = createVanilla<BuylistBarState>(
  devtools(state, "buylist-bar")
);

// store for usage inside of react
export const useStoreBuylistBar = create<BuylistBarState>(buylistBarStore);
