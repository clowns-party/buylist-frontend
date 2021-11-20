import { useApolloClient } from "@apollo/client";
import { EditableFieldProps } from "../lib/types";
import { useEditBuylistFieldMutation } from "../model";

type Params = {
  field: EditableFieldProps["field"];
  id: number;
  value: string;
};

const useBuylistEditField = (fieldName = "buylist") => {
  const client = useApolloClient();
  const [actionEdit, { loading, error }] = useEditBuylistFieldMutation();

  const edit = async ({ field, id, value }: Params) => {
    await actionEdit({
      variables: {
        id,
        input: {
          [field]: value,
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

export default useBuylistEditField;
