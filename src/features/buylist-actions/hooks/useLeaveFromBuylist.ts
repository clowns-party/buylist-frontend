import { Routes } from "../../../shared/routes/index";
import { useApolloClient } from "@apollo/client";
import { useRouter } from "next/router";
import { useLeaveMutation } from "../model";

export const useLeaveFromBuylist = () => {
  const router = useRouter();
  const client = useApolloClient();
  const [leaveBuylist, { loading }] = useLeaveMutation();

  const onLeave = async (id: number) => {
    await leaveBuylist({ variables: { buylistId: id } });
    await client.refetchQueries({
      updateCache(cache) {
        cache.evict({ fieldName: "myBuylists" });
      },
    });
    router.push(Routes.profile);
  };
  return { onLeave, loading };
};
