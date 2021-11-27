export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: any;
};

export type AuthLoginInput = {
  email: Scalars["String"];
  password: Scalars["String"];
};

export type AuthRegisterInput = {
  email: Scalars["String"];
  firstName: Scalars["String"];
  lastName: Scalars["String"];
  password: Scalars["String"];
  phone: Scalars["String"];
};

export type Buylist = {
  __typename?: "Buylist";
  description: Scalars["String"];
  id: Scalars["Int"];
  members: Array<Member>;
  name: Scalars["String"];
  owner: User;
  ownerId: Scalars["Int"];
  products: Array<Product>;
  status: Statuses;
  totalPrice: Scalars["Int"];
};

export type Buylists = {
  __typename?: "Buylists";
  description: Scalars["String"];
  id: Scalars["Int"];
  name: Scalars["String"];
  owner: User;
  ownerId: Scalars["Int"];
  products: Array<Product>;
  status: Statuses;
  totalPrice: Scalars["Int"];
};

export type CreateBuylistInput = {
  description: Scalars["String"];
  name: Scalars["String"];
  status: Statuses;
  totalPrice: Scalars["Float"];
};

export type CreateProductBuyListInput = {
  buyBefore?: Maybe<Scalars["DateTime"]>;
  color?: Maybe<Scalars["String"]>;
  comment: Scalars["String"];
  coordinate?: Maybe<Array<Scalars["String"]>>;
  imageUrl?: Maybe<Scalars["String"]>;
  link?: Maybe<Scalars["String"]>;
  name: Scalars["String"];
  price: Scalars["Float"];
};

export type Invite = {
  __typename?: "Invite";
  buylist: Buylist;
  from: User;
  id: Scalars["Int"];
  status: InviteStatuses;
  to: User;
};

export enum InviteStatuses {
  Accepted = "ACCEPTED",
  Expectation = "EXPECTATION",
  Rejected = "REJECTED",
}

export type Member = {
  __typename?: "Member";
  id: Scalars["Int"];
  user: User;
  userId: Scalars["Int"];
};

export type Mutation = {
  __typename?: "Mutation";
  acceptInvite: Invite;
  createList: Buylist;
  createProduct: Buylist;
  declineInvite: Invite;
  deleteList: Scalars["Boolean"];
  deleteProduct: Buylist;
  invite: Invite;
  leave: Scalars["Boolean"];
  login: Scalars["String"];
  register: User;
  updateList: Buylist;
  updateProduct: Buylist;
  updateUser: User;
};

export type MutationAcceptInviteArgs = {
  id: Scalars["Int"];
};

export type MutationCreateListArgs = {
  input: CreateBuylistInput;
};

export type MutationCreateProductArgs = {
  buyListId: Scalars["Int"];
  input: CreateProductBuyListInput;
};

export type MutationDeclineInviteArgs = {
  id: Scalars["Int"];
};

export type MutationDeleteListArgs = {
  id: Scalars["Int"];
};

export type MutationDeleteProductArgs = {
  buyListId: Scalars["Int"];
  productId: Scalars["Int"];
};

export type MutationInviteArgs = {
  buyListId: Scalars["Int"];
  toUserId: Scalars["Int"];
};

export type MutationLeaveArgs = {
  id: Scalars["Int"];
};

export type MutationLoginArgs = {
  input: AuthLoginInput;
};

export type MutationRegisterArgs = {
  input: AuthRegisterInput;
};

export type MutationUpdateListArgs = {
  id: Scalars["Int"];
  input: UpdateBuylistInput;
};

export type MutationUpdateProductArgs = {
  buyListId: Scalars["Int"];
  input: UpdateProductBuyListInput;
  productId: Scalars["Int"];
};

export type MutationUpdateUserArgs = {
  input: UpdateUserInput;
};

export type Product = {
  __typename?: "Product";
  author: User;
  authorId: Scalars["Int"];
  buyBefore?: Maybe<Scalars["DateTime"]>;
  color?: Maybe<Scalars["String"]>;
  comment: Scalars["String"];
  coordinate?: Maybe<Array<Scalars["String"]>>;
  id: Scalars["Int"];
  imageUrl?: Maybe<Scalars["String"]>;
  link?: Maybe<Scalars["String"]>;
  name: Scalars["String"];
  price: Scalars["Int"];
};

export type Query = {
  __typename?: "Query";
  buylist: Buylist;
  buylists: Array<Buylists>;
  myBuylists: Array<Buylists>;
  myInvites: Array<Invite>;
  product: Product;
  profile: User;
  searchUsers: Array<User>;
};

export type QueryBuylistArgs = {
  id: Scalars["Int"];
};

export type QueryProductArgs = {
  id: Scalars["Int"];
};

export type QuerySearchUsersArgs = {
  query: Scalars["String"];
};

export enum Statuses {
  Closed = "CLOSED",
  Created = "CREATED",
  Current = "CURRENT",
}

export type Subscription = {
  __typename?: "Subscription";
  buylistWatch: Buylist;
};

export type SubscriptionBuylistWatchArgs = {
  id: Scalars["Int"];
};

export type UpdateBuylistInput = {
  description?: Maybe<Scalars["String"]>;
  name?: Maybe<Scalars["String"]>;
  status?: Maybe<Statuses>;
  totalPrice?: Maybe<Scalars["Float"]>;
};

export type UpdateProductBuyListInput = {
  buyBefore?: Maybe<Scalars["DateTime"]>;
  color?: Maybe<Scalars["String"]>;
  comment?: Maybe<Scalars["String"]>;
  coordinate?: Maybe<Array<Scalars["String"]>>;
  imageUrl?: Maybe<Scalars["String"]>;
  link?: Maybe<Scalars["String"]>;
  name?: Maybe<Scalars["String"]>;
  price?: Maybe<Scalars["Float"]>;
};

export type UpdateUserInput = {
  email?: Maybe<Scalars["String"]>;
  firstName?: Maybe<Scalars["String"]>;
  lastName?: Maybe<Scalars["String"]>;
  phone?: Maybe<Scalars["String"]>;
};

export type User = {
  __typename?: "User";
  email: Scalars["String"];
  firstName: Scalars["String"];
  id: Scalars["Int"];
  lastName: Scalars["String"];
  phone: Scalars["String"];
};
