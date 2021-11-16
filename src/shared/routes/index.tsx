export const Routes = {
  home: "/",
  createBuylist: "/buylist/create",
  signin: "/signin",
  signup: "/signup",
  profile: "/profile",
  buylistById: (id: string) => `/buylist/${id}`
};
