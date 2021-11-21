import { useApolloClient } from "@apollo/client";
import { ProductFields } from "features/create-buylist/lib/types";
import { useCreateProductMutation } from "features/create-buylist/model";

const useCreateProduct = (fieldName = "buylist") => {
  const client = useApolloClient();
  const [createProduct, { loading, error }] = useCreateProductMutation();
  const create = async (buyListId: number, fields: ProductFields) => {
    const { id, ...input } = fields;
    await createProduct({
      variables: {
        buyListId,
        input,
      },
    });
    await client.refetchQueries({
      updateCache(cache) {
        cache.evict({ fieldName });
      },
    });
  };
  return { create, loading, error };
};

export default useCreateProduct;
