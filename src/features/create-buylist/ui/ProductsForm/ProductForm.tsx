import { SearchGeo } from "entities/map";
import { Product } from "entities/product/lib/types";
import { ProductFields } from "features/create-buylist/lib/types";
import { Formik, useFormikContext } from "formik";
import { FC } from "react";
import { useEffect } from "react";
import { ColorPicker, Input } from "shared/ui";

type Props = {
  product: Product | ProductFields;
  onSubmit: (values: Product | ProductFields) => void;
};

const ProductForm: FC<Props> = ({ product, onSubmit }) => {
  return (
    <Formik
      enableReinitialize
      initialValues={product}
      validate={(values) => {
        const errors: Partial<typeof values> = {};
        if (values.name?.length < 5) {
          errors.name = "The name must be more than 5 characters";
        }
        if (!values.comment) {
          errors.comment = "Fill in the field";
        }
        return errors;
      }}
      onSubmit={onSubmit}
    >
      {({ handleChange, setFieldValue, handleBlur, values, errors }) => {
        return (
          <div className="w-96 flex flex-col">
            <div className="flex space-x-4 items-left justify-between mb-5">
              <div className="flex flex-col flex-auto">
                <label className="leading-loose">Name</label>
                <Input
                  type="text"
                  placeholder="Name"
                  name="name"
                  error={errors?.name}
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
                  error={errors?.comment}
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
                error={errors?.price}
                onChange={(e) =>
                  setFieldValue("price", Number(e.target.value) || 0)
                }
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
  );
};

const AutoSubmit = () => {
  const { values, submitForm } = useFormikContext();
  useEffect(() => {
    // Submit the form imperatively as an effect as soon as form values.token are 6 digits long
    if (values) {
      submitForm();
    }
  }, [values, submitForm]);
  return <></>;
};

export default ProductForm;
