import { useApolloClient } from "@apollo/client";
import { GetBuylistByIdDocument } from "entities/buylist/model/queries/buylistById.query.generated";
import { useRouter } from "next/router";
import React, { FC, useRef, useState } from "react";
import { useClickAway } from "react-use";
import { Input } from "shared/ui";
import styled from "styled-components";
import { EditableFieldProps } from "../lib/types";
import { useEditBuylistField } from "../model";

type Props = {
  editable: boolean;
  field: EditableFieldProps["field"];
  value: string;
  className?: string;
  fieldName?: string;
};
const EditableField: FC<Props> = ({
  editable,
  field,
  value,
  children,
  className,
  fieldName = "buylist",
}) => {
  const [actionEdit, { loading }] = useEditBuylistField();
  const client = useApolloClient();

  const input = useRef(null);
  const [edit, setEdit] = useState(false);
  const [form, setForm] = useState({ value });

  const { query } = useRouter();

  const id = query?.id?.toString();
  const editMode = edit && editable;

  const onValidate = () => {
    if (form.value === value) {
      return false;
    }
    return true;
  };

  const onClose = async () => {
    if (onValidate()) {
      await actionEdit({
        variables: {
          id: Number(id),
          input: {
            [field]: form.value,
          },
        },
      });
      await client.refetchQueries({
        updateCache(cache) {
          cache.evict({ fieldName });
        },
      });
    }

    setEdit(false);
  };

  const onEdit = () => {
    setEdit(true);
  };
  const onChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ value: target.value });
  };

  useClickAway(input, onClose);

  return (
    <Editable
      ref={input}
      onDoubleClick={onEdit}
      className={`${className || ""} cursor-pointer`}
    >
      {!editMode ? (
        children
      ) : (
        <Input value={form.value} onChange={onChange} loading={loading} />
      )}
    </Editable>
  );
};

const Editable = styled.div``;

export default EditableField;
