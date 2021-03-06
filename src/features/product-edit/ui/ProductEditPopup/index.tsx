import { FC } from "react";
import Modal, { ModalProps } from "shared/ui/Modal/ui";
import * as React from "react";
import ProductForm from "features/create-buylist/ui/ProductsForm/ProductForm";
import { ProductProps } from "entities/product/ui/ProductCard";
import { useState } from "react";
import { useRouter } from "next/router";
import { Button } from "shared/ui";
import { useProductEdit } from "features/product-edit/hooks";

type Props = ProductProps & ModalProps;
const ProductEditPopup: FC<Props> = ({ isOpen, closeModal, product }) => {
  const { query } = useRouter();
  const [form, setForm] = useState(product);
  const { edit, loading } = useProductEdit();
  const [hasErrors, setHasErrors] = useState(false);

  const id = Number(query?.id?.toString());

  const onChange = (values: Props["product"]) => {
    if (loading) return;
    setForm(values);
  };

  const onSubmit = async () => {
    await edit(form, id);
    closeModal();
  };
  const onValidate = (hasErrors: boolean) => {
    setHasErrors(hasErrors);
  };

  return (
    <Modal isOpen={isOpen} closeModal={!loading ? closeModal : () => {}}>
      <ProductForm product={form} onSubmit={onChange} onValidate={onValidate} />
      <Button onClick={onSubmit} loading={loading} disabled={hasErrors}>
        Submit
      </Button>
    </Modal>
  );
};

export default ProductEditPopup;
