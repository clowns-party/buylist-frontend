import { GetState, SetState } from "zustand/vanilla";

type Filters = "default" | "status";
type ORDER = "asc" | "desc";

export interface BuylistBarState {
  filter: Filters;
  setFilter: (filter: Filters) => void;
  order: ORDER;
  setOrder: (order: ORDER) => void;
  search: string;
  onSearch: (search: string) => void;
}

type State = (
  set: SetState<BuylistBarState>,
  get: GetState<BuylistBarState>
) => BuylistBarState;

const state: State = (set, get) => ({
  filter: "default",
  setFilter: (filter) => {
    set({ filter });
  },
  order: "asc",
  setOrder: (order) => {
    set({ order });
  },
  search: "",
  onSearch: (search) => {
    set({ search });
  },
});

export default state;
