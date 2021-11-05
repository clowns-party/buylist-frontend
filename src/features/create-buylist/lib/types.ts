import {
  CreateProductBuyListInput,
  Statuses,
  User,
} from "types/types.generated";

export type MockedProduct = CreateProductBuyListInput & { id: number };

export type MockedBuylist = {
  description: string;
  id: number;
  members: User[] | undefined;
  name: string;
  owner: User | undefined;
  ownerId: number | undefined;
  products: MockedProduct[];
  status: Statuses;
  totalPrice: number;
};
