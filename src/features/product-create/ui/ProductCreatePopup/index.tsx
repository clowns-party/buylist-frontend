import { FC } from "react";
import Modal, { ModalProps } from "shared/ui/Modal/ui";
import * as React from "react";
import ProductForm from "features/create-buylist/ui/ProductsForm/ProductForm";
import { useState } from "react";
import { useRouter } from "next/router";
import { Button } from "shared/ui";
import { initialProduct } from "features/create-buylist/model/state";
import { ProductFields } from "features/create-buylist/lib/types";
import useCreateProduct from "features/product-create/hooks/useCreateProduct";

type Props = ModalProps;
const ProductCreatePopup: FC<Props> = ({ isOpen, closeModal }) => {
  const { query } = useRouter();
  const [form, setForm] = useState(initialProduct);
  const { create, loading } = useCreateProduct();

  const id = Number(query?.id?.toString());

  const onChange = (values: ProductFields) => {
    if (loading) return;
    setForm(values);
  };

  const onSubmit = async () => {
    await create(id, form);
    closeModal();
  };

  return (
    <Modal isOpen={isOpen} closeModal={!loading ? closeModal : () => {}}>
      <ProductForm product={form} onSubmit={onChange} />
      <Button onClick={onSubmit} loading={loading}>
        Create
      </Button>
    </Modal>
  );
};

export default ProductCreatePopup;
