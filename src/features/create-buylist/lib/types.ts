import {
  CreateProductBuyListInput,
  Statuses,
  User,
} from "types/types.generated";

export type ProductFields = CreateProductBuyListInput & { id: number };

export type MockedBuylist = {
  description: string;
  id: number;
  members: User[] | undefined;
  name: string;
  owner: User | undefined;
  ownerId: number | undefined;
  products: ProductFields[];
  status: Statuses;
  totalPrice: number;
};
