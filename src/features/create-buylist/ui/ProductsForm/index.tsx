import { SearchGeo } from "entities/map";
import { ProductCard } from "entities/product";
import { useStoreCreateBuylist } from "features/create-buylist/hooks";
import { Formik } from "formik";
import { useState } from "react";
import { Button, ColorPicker, Input } from "shared/ui";

const Form = () => {
  const productForm = useStoreCreateBuylist((state) => state.products[0]);
  const [preview, showPreview] = useState(false);
  const onShow = () => {
    showPreview(!preview);
  };

  const submit = (values: any) => {
    // setForm(values);
    // setStep(CreateBuylistSteps.Products);
  };
  return (
    <div className="relative py-3 sm:mx-auto">
      <div className="relative px-4 py-10 bg-white mx-8 md:mx-0 shadow rounded-3xl sm:p-10">
        <div>
          <div className="form">
            <div className="flex space-x-8 mb-10">
              <Button
                disabled={!preview}
                onClick={onShow}
                className="flex-auto"
              >
                Create product
              </Button>
              <Button disabled={preview} onClick={onShow} className="flex-auto">
                Preview
              </Button>
            </div>

            <Formik
              initialValues={productForm}
              validate={(values) => {
                const errors: Partial<typeof values> = {};
                if (values.name?.length < 5) {
                  errors.name = "The name must be more than 5 characters";
                }
                return errors;
              }}
              onSubmit={submit}
            >
              {({
                errors,
                handleChange,
                setFieldValue,

                handleBlur,
                handleSubmit,
                values,
                isValid,
                touched,
                setTouched,
              }) => {
                if (preview) {
                  return <ProductCard product={values} />;
                }
                return (
                  <div>
                    <div className="flex items-center space-x-4 justify-between">
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
                      <div className="flex flex-col flex-auto">
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
                    </div>

                    <div className="flex flex-col">
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

                    <div className="flex items-center space-x-4 justify-between">
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

                    <div className="flex flex-col">
                      <label className="leading-loose">Address</label>
                      <SearchGeo
                        changeGeo={(geo) => {
                          setFieldValue("coordinate", geo);
                        }}
                      />
                    </div>

                    <div className="flex flex-col">
                      <label className="leading-loose">Card color</label>
                      <ColorPicker
                        color={values.color as string}
                        setColor={(color) => {
                          setFieldValue("color", color);
                        }}
                      />
                    </div>
                  </div>
                );
              }}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Form;
