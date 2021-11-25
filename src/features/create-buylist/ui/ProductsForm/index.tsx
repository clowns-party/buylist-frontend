import React, { useState } from "react";
import { ProductCard } from "entities/product";
import { useStoreCreateBuylist } from "features/create-buylist/hooks";
import { useFormikContext } from "formik";
import { Button, Container } from "shared/ui";
import {
  CreateBuylistSteps,
  initialProduct,
} from "features/create-buylist/model/state";
import { ProductFields } from "features/create-buylist/lib/types";
import styled from "styled-components";
import ProductForm from "./ProductForm";

const Form = () => {
  const products = useStoreCreateBuylist((state) => state.products);
  const updateProduct = useStoreCreateBuylist((state) => state.updateProduct);
  const addProduct = useStoreCreateBuylist((state) => state.addProduct);
  const setStep = useStoreCreateBuylist((state) => state.setStep);
  const [productForm, setProductForm] = useState(products[0] || initialProduct);
  const onSubmit = (values: ProductFields) => {
    updateProduct(values?.id, values as any);
  };
  const setCardInForm = (id: number | undefined) => {
    const selectedCard: any = products?.find((el) => el.id === id);
    setProductForm(selectedCard);
  };
  const disableAdding = products?.length >= 5;
  const validateProductsFields = (items: ProductFields[]) =>
    items?.some((el) => !el.name || !el.comment);

  return (
    <Container.Bordered>
      <div className="flex justify-center md:space-x-6 md:flex-nowrap flex-wrap">
        <ProductForm product={productForm} onSubmit={onSubmit} />
        <div className="flex justify-between flex-col h-1/2 md:overflow-visible md:mt-0 mt-6 pl-0 pr-0 overflow-hidden">
          <ScrollBar className="hide-scroll-bar max-w-96">
            {products?.map((el, index) => {
              const active =
                el.id === productForm?.id
                  ? `border-indigo-500 border-2 border-opacity-25`
                  : "";
              return (
                <div
                  key={index}
                  onClick={() => {
                    setCardInForm(el.id);
                  }}
                  className="cursor-pointer"
                >
                  <ProductCard
                    product={el}
                    className={`ml-2 mr-2 mb-10 ${active}`}
                  />
                </div>
              );
            })}
            <Form.Counter disable={disableAdding} action={addProduct} />
          </ScrollBar>
          <div className="flex justify-end mt-6">
            <Button
              disabled={validateProductsFields(products)}
              onClick={() => setStep(CreateBuylistSteps.Preview)}
            >
              Continue
            </Button>
          </div>
        </div>
      </div>
    </Container.Bordered>
  );
};

Form.Counter = ({
  disable,
  action,
}: {
  disable: boolean;
  action: () => void;
}) => {
  return (
    <div className="flex justify-center" style={{ opacity: disable ? 0 : 1 }}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={`h-12 w-12 ${!disable && "cursor-pointer"}`}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        onClick={() => !disable && action()}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={0.5}
          d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    </div>
  );
};

const ScrollBar = styled.div`
  overflow-y: auto;
  height: 503px;
  @media (max-width: 768px) {
    height: auto;
    display: flex;
    overflow: hidden;
    width: 100%;
    overflow-x: auto;
    align-items: center;
  }
`;

const AutoSubmit = () => {
  const { values, submitForm } = useFormikContext();
  React.useEffect(() => {
    // Submit the form imperatively as an effect as soon as form values.token are 6 digits long
    if (values) {
      submitForm();
    }
  }, [values, submitForm]);
  return <></>;
};

export default Form;
