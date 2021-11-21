import { useApolloClient } from "@apollo/client";
import { ProductProps } from "entities/product/ui/ProductCard";
import { useUpdateProductMutation } from "../model";

const useProductEdit = (fieldName = "buylist") => {
  const client = useApolloClient();
  const [update, { loading, error }] = useUpdateProductMutation();

  const edit = async (form: ProductProps["product"], buylistId: number) => {
    const {
      buyBefore,
      color,
      comment,
      coordinate,
      imageUrl,
      link,
      name,
      price,
    } = form;

    await update({
      variables: {
        buyListId: buylistId,
        productId: form.id,
        input: {
          buyBefore,
          color,
          comment,
          coordinate,
          imageUrl,
          link,
          name,
          price,
        },
      },
    });
    await client.refetchQueries({
      updateCache(cache) {
        cache.evict({ fieldName });
      },
    });
  };
  return { edit, loading, error };
};

export default useProductEdit;
