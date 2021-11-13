import React, { useState } from "react";
import { SearchGeo } from "entities/map";
import { ProductCard } from "entities/product";
import { useStoreCreateBuylist } from "features/create-buylist/hooks";
import { Formik, useFormik, useFormikContext } from "formik";
import { Button, ColorPicker, Input } from "shared/ui";
import { initialProduct } from "features/create-buylist/model/state";

const Form = () => {
  const products = useStoreCreateBuylist((state) => state.products);
  const updateProduct = useStoreCreateBuylist((state) => state.updateProduct);
  const addProduct = useStoreCreateBuylist((state) => state.addProduct);
  const [productForm, setProductForm] = useState(products[0] || initialProduct);
  const onSubmit = (values: any) => {
    updateProduct(values?.id, values as any);
  };
  const setCardInForm = (id: number | undefined) => {
    const selectedCard: any = products?.find((el) => el.id === id);
    setProductForm(selectedCard);
  };
  const emptyName = products?.some((el) => el.name === "");

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
        <div className="flex justify-between flex-col h-1/2 md:mt-0 mt-32">
          <div className="flex justify-end mb-10">
            <Button onClick={() => addProduct()} disabled={emptyName}>
              Add Product
            </Button>
          </div>
          <div className="overflow-auto h-96 pl-16 pr-16">
            {products?.map((el, index) => {
              const active =
                el.id === productForm?.id
                  ? `border-indigo-500 border-2 border-opacity-25`
                  : "";
              return (
                //
                <ProductCard
                  setCardInForm={setCardInForm}
                  key={index.toString()}
                  product={el}
                  className={`mb-10 ${active}`}
                />
              );
            })}
          </div>
          <div className="mt-28">
            <Button className="w-full">Submit</Button>
          </div>
        </div>
      </div>
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
