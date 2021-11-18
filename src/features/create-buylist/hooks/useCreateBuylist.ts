import { useCreateBuylistMutation } from ".";
import { useCreateProductMutation } from "../model/mutations/create-product/createProduct.mutation.generated";
import { useStoreCreateBuylist } from "features/create-buylist/hooks";
import { CreateProductBuyListInput } from "types/types.generated";
import { CreateBuylistState } from "../model/state";

export type createBuylistResult = {
  buylist_id: number | undefined;
  data: CreateBuylistState[] | undefined;
};

export const useCreateBuylist = () => {
  const [createProductMutation, { loading: loadingPr, error: errorPr }] =
    useCreateProductMutation();
  const [createBuylistMutation, { loading: loadingBl, error: errorBl }] =
    useCreateBuylistMutation();
  // TODO CHECK ID
  const products = useStoreCreateBuylist((state) =>
    state.products?.map(({ id, buyBefore, ...el }) => el)
  );
  const form = useStoreCreateBuylist((state) => state.form);

  const createProduct = async (
    buyListId: number,
    fields: CreateProductBuyListInput
  ) => {
    return createProductMutation({
      variables: { buyListId: buyListId, input: fields },
    });
  };

  const createBuylist = async (): Promise<createBuylistResult | undefined> => {
    try {
      const buyList = await createBuylistMutation({
        variables: { input: form },
      });
      const id = buyList?.data?.createList?.id;
      if (!id) throw new Error("Buylist failure");
      const result: CreateBuylistState[] = await products?.reduce(
        async (memo: any, fields) => {
          const results = await memo;
          const currentResult = await createProduct(id, fields);
          return [...results, currentResult];
        },
        []
      );
      return { buylist_id: id, data: result };
    } catch (error) {}
  };

  return { createBuylist, loading: loadingPr || loadingBl };
};

// const res = await fields.reduce(async (memo, field) => {
//     const results = await memo;
//     print("start");
//     const currentResult = await createProduct(field);
//     print("end");
//     return [...results, currentResult];
//   }, []);
//   print("ALL ENDED_____");

// const createProduct = async (args) => {
//   print(args.name + "____________WAS CALLED!");
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       resolve(args);
//     }, args.sec);
//   });
// };
// const fields = [
//   {
//     name: "TEST FIRST",
//     desc: "test",
//     sec: 2000,
//   },
//   {
//     name: "TEST SECOND",
//     desc: "test",
//     sec: 300,
//   },
// ];

// (async () => {
//   const res = await fields.reduce(async (memo, field) => {
//     const results = await memo;
//     print("start");
//     const currentResult = await createProduct(field);
//     print("end");
//     return [...results, currentResult];
//   }, []);
//   print("ALL ENDED_____");
// })();
