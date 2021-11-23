import { useCallback } from "react";
import { useRouter } from "next/router";
import React, { FC, useRef, useState } from "react";
import { useClickAway } from "react-use";
import { Input } from "shared/ui";
import styled from "styled-components";
import useBuylistEditField from "../hooks/useBuylistEditField";
import { EditableFieldProps } from "../lib/types";

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
  fieldName,
}) => {
  const { edit: actionEdit, loading } = useBuylistEditField(fieldName);

  const input = useRef(null);
  const [edit, setEdit] = useState(false);
  const [form, setForm] = useState({ value });

  const { query } = useRouter();
  const editMode = edit && editable;

  const onValidate = useCallback(() => {
    if (form.value === value) {
      return false;
    }
    return true;
  }, [value, form?.value]);

  const onClose = useCallback(async () => {
    const id = query?.id?.toString();
    if (onValidate() && edit) {
      await actionEdit({
        id: Number(id),
        value: form.value,
        field,
      });
    }

    setEdit(false);
  }, [query?.id, onValidate]);

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
