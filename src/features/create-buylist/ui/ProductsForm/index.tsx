import { SearchGeo } from "entities/map";
import { ProductCard } from "entities/product";
import { useStoreCreateBuylist } from "features/create-buylist/hooks";
import { Formik, useFormikContext } from "formik";
import React from "react";
import { Button, ColorPicker, Input } from "shared/ui";

const Form = () => {
  const products = useStoreCreateBuylist((state) => state.products);
  const productForm = products[0];
  const updateProduct = useStoreCreateBuylist((state) => state.updateProduct);
  const onSubmit = (values: any) => {
    updateProduct(productForm.id, values as any);
  };
  console.log(productForm);

  return (
    <div className="relative py-20 sm:mx-auto">
      <div className="flex justify-center md:space-x-6 md:flex-nowrap flex-wrap">
        <Formik
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
        <div className="flex justify-between flex-col h-124 md:mt-0 mt-32">
          <div className="overflow-auto h-full">
            <ProductCard product={productForm} className="mb-10" />
            <ProductCard product={productForm} className="mb-10" />
            <ProductCard product={productForm} className="mb-10" />
            <ProductCard product={productForm} className="mb-10" />
            <ProductCard product={productForm} className="mb-10" />
          </div>
          <div className="mt-28">
            <Button>Submit</Button>
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
