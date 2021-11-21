import { useApolloClient } from "@apollo/client";
import { useDeleteProductMutation } from '../model';

const useDeleteProduct = (fieldName = "buylist") => {
  const client = useApolloClient();
  const [deleteProduct, { loading, error }] = useDeleteProductMutation();
  const onDelete = async (buyListId: number, productId: number) => {
    await deleteProduct({
      variables: {
        buyListId,
        productId,
      },
    });
    await client.refetchQueries({
      updateCache(cache) {
        cache.evict({ fieldName });
      },
    });
  };
  return { onDelete, loading, error };
};

export default useDeleteProduct;
