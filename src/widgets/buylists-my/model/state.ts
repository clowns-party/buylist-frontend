import { GetState, SetState } from "zustand/vanilla";

export interface MyBuyliststState {
  search: string;
  setSearch: (search: string) => void;
}

type State = (
  set: SetState<MyBuyliststState>,
  get: GetState<MyBuyliststState>
) => MyBuyliststState;

const state: State = (set, get) => ({
  search: "",
  setSearch: (search) => {
    set({ search });
  },
});

export default state;
