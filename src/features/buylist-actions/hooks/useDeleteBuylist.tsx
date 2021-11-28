import { useApolloClient } from "@apollo/client";
import { useRouter } from "next/router";
import { Routes } from "shared/routes";
import { useDeleteListMutation } from "../model";

export const useDeleteBuylist = () => {
  const router = useRouter();
  const client = useApolloClient();
  const [deleteBuylist, { loading }] = useDeleteListMutation();

  const onDelete = async (id: number) => {
    await deleteBuylist({ variables: { id } });
    await client.refetchQueries({
      updateCache(cache) {
        cache.evict({ fieldName: "myBuylists" });
      },
    });
    router.push(Routes.profile);
  };
  return { onDelete, loading };
};
