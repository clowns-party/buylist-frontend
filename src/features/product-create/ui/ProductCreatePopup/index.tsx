import { ProductFields } from "features/create-buylist/lib/types";
import { initialProduct } from "features/create-buylist/model/state";
import ProductForm from "features/create-buylist/ui/ProductsForm/ProductForm";
import useCreateProduct from "features/product-create/hooks/useCreateProduct";
import { useRouter } from "next/router";
import * as React from "react";
import { FC, useState } from "react";
import { Button } from "shared/ui";
import Modal, { ModalProps } from "shared/ui/Modal/ui";

type Props = ModalProps;
const ProductCreatePopup: FC<Props> = ({ isOpen, closeModal }) => {
  const { query } = useRouter();
  const [form, setForm] = useState(initialProduct);
  const { create, loading } = useCreateProduct();
  const [hasErrors, setHasErrors] = useState(false);

  const id = Number(query?.id?.toString());

  const onChange = (values: ProductFields) => {
    if (loading) return;
    setForm(values);
  };

  const onSubmit = async () => {
    await create(id, form);
    closeModal();
  };

  const onValidate = (hasErrors: boolean) => {
    setHasErrors(hasErrors);
  };

  return (
    <Modal isOpen={isOpen} closeModal={!loading ? closeModal : () => {}}>
      <ProductForm product={form} onSubmit={onChange} onValidate={onValidate} />
      <Button onClick={onSubmit} loading={loading} disabled={hasErrors}>
        Create
      </Button>
    </Modal>
  );
};

export default ProductCreatePopup;
