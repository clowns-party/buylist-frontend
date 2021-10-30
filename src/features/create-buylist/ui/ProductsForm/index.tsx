import Map from "entities/map";
import { ProductCard } from "entities/product";
import { useState } from "react";
import { Button, Input } from "shared/ui";

const Form = () => {
  const [preview, showPreview] = useState(false);
  // TODO is duplicate wrap from BuylistForm, refactor later
  const onShow = () => {
    showPreview(!preview);
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

            {preview ? (
              <ProductCard
                product={{
                  imageUrl:
                    "https://www.pivokom.ru/upload/iblock/1f5/1f5e23a8c12e69cdb2872e05570e32f8.JPG",
                  name: "test",
                }}
              />
            ) : (
              <>
                <div className="flex flex-col">
                  <label className="leading-loose">Title</label>
                  <Input type="text" placeholder="Buylist name" name="name" />
                </div>
                <Input />
                <Input />
                <Input />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Form;
