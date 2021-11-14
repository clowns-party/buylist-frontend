import React, { useState } from "react";
import { SearchGeo } from "entities/map";
import { ProductCard } from "entities/product";
import { useStoreCreateBuylist } from "features/create-buylist/hooks";
import { Formik, useFormikContext } from "formik";
import { Button, ColorPicker, Input } from "shared/ui";
import { initialProduct } from "features/create-buylist/model/state";
import { MockedProduct } from "features/create-buylist/lib/types";

const Form = () => {
  const products = useStoreCreateBuylist((state) => state.products);
  const updateProduct = useStoreCreateBuylist((state) => state.updateProduct);
  const addProduct = useStoreCreateBuylist((state) => state.addProduct);
  const [productForm, setProductForm] = useState(products[0] || initialProduct);
  const onSubmit = (values: MockedProduct) => {
    updateProduct(values?.id, values as any);
  };
  const setCardInForm = (id: number | undefined) => {
    const selectedCard: any = products?.find((el) => el.id === id);
    setProductForm(selectedCard);
  };
  const disableAdding = products?.length >= 5;
  const emptyName = products?.some((el) => el.name === "");
  const filteredProducts = products?.sort((a, b) => a.id - b.id);

  return (
    <div className="relative py-20 sm:mx-auto">
      <div className="flex justify-center md:space-x-6 md:flex-nowrap flex-wrap">
        <Formik
          enableReinitialize
          initialValues={productForm}
          validate={(values) => {
            const errors: Partial<typeof values> = {};
            if (values.name?.length < 5) {
              errors.name = "The name must be more than 5 characters";
            }
            return errors;
          }}
          onSubmit={onSubmit}
        >
          {({
            handleChange,
            setFieldValue,
            handleBlur,
            values,
            handleSubmit,
          }) => {
            return (
              <div className="w-96 flex flex-col">
                <div className="flex space-x-4 items-left justify-between mb-5">
                  <div className="flex flex-col flex-auto">
                    <label className="leading-loose">Name</label>
                    <Input
                      type="text"
                      placeholder="Name"
                      name="name"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values?.name || ""}
                    />
                  </div>
                  <div className="flex flex-col flex-auto">
                    <label className="leading-loose">Comment</label>
                    <Input
                      type="text"
                      placeholder="Comment"
                      name="comment"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values?.comment || ""}
                    />
                  </div>
                </div>
                <div className="flex flex-col  mb-5">
                  <label className="leading-loose">Price</label>
                  <Input
                    type="text"
                    placeholder="Price"
                    name="price"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values?.price || 0}
                  />
                </div>

                <div className="flex flex-col mb-5">
                  <label className="leading-loose">Buy before</label>
                  <Input
                    type="date"
                    placeholder="Buy before"
                    name="buyBefore"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values?.buyBefore || ""}
                  />
                </div>

                <div className="flex items-center space-x-4 justify-between mb-5">
                  <div className="flex flex-col flex-auto">
                    <label className="leading-loose">Image Url</label>
                    <Input
                      type="text"
                      placeholder="Image url"
                      name="imageUrl"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values?.imageUrl || ""}
                    />
                  </div>
                  <div className="flex flex-col flex-auto">
                    <label className="leading-loose">Link</label>
                    <Input
                      type="text"
                      placeholder="Link"
                      name="link"
                      value={values?.link || ""}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </div>
                </div>

                <div className="flex flex-col mb-5">
                  <label className="leading-loose">Address</label>
                  <SearchGeo
                    changeGeo={(geo) => {
                      setFieldValue("coordinate", geo);
                    }}
                  />
                </div>

                <div className="flex flex-col mb-5">
                  <label className="leading-loose">Card color</label>
                  <ColorPicker
                    color={values.color as string}
                    setColor={(color) => {
                      setFieldValue("color", color);
                    }}
                  />
                </div>
                <AutoSubmit />
              </div>
            );
          }}
        </Formik>
        <div className="flex justify-between flex-col h-1/2 md:mt-0 mt-32 pl-16 pr-16">
          <div
            className="overflow-y-auto hide-scroll-bar"
            style={{ height: 503 }}
          >
            {filteredProducts?.map((el, index) => {
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
                  className="cursor-pointer hover:shadow-xl transition-shadow duration-300 ease-in-out"
                >
                  <ProductCard product={el} className={`mb-10 ${active}`} />
                </div>
              );
            })}
            <Form.Counter disable={disableAdding} action={addProduct} />
          </div>
          <div className="flex justify-end mt-6">
            <Button disabled={emptyName}>Submit</Button>
          </div>
        </div>
      </div>
    </div>
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
