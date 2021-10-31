import { SearchGeo } from "entities/map";
import { ProductCard } from "entities/product";
import { useState } from "react";
import { Button, Input } from "shared/ui";
import { CreateProductBuyListInput } from "../../../../types/types.generated";

const Form = () => {
  const [geo, setGeo] = useState<string[]>(["0", "0"]);
  const [preview, showPreview] = useState(false);
  // TODO is duplicate wrap from BuylistForm, refactor later
  const onShow = () => {
    showPreview(!preview);
  };
  const product: CreateProductBuyListInput = {
    comment: "Awesome product lorem",
    price: 43,
    buyBefore: 23213,
    color: "3",
    coordinate: geo,
    link: "",
    imageUrl:
      "https://www.pivokom.ru/upload/iblock/1f5/1f5e23a8c12e69cdb2872e05570e32f8.JPG",
    name: "My product",
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
              <ProductCard product={product} />
            ) : (
              <div>
                <div className="flex items-center space-x-4 justify-between">
                  <div className="flex flex-col flex-auto">
                    <label className="leading-loose">Name</label>
                    <Input type="text" placeholder="Name" name="name" />
                  </div>
                  <div className="flex flex-col flex-auto">
                    <label className="leading-loose">Comment</label>
                    <Input type="text" placeholder="Comment" name="comment" />
                  </div>
                  <div className="flex flex-col flex-auto">
                    <label className="leading-loose">Price</label>
                    <Input type="text" placeholder="Price" name="price" />
                  </div>
                </div>

                <div className="flex flex-col">
                  <label className="leading-loose">Buy before</label>
                  <Input
                    type="date"
                    placeholder="Buy before"
                    name="buyBefore"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="leading-loose">Color</label>
                  <Input type="color" placeholder="Color" name="color" />
                </div>

                <div className="flex items-center space-x-4 justify-between">
                  <div className="flex flex-col flex-auto">
                    <label className="leading-loose">Image Url</label>
                    <Input
                      type="text"
                      placeholder="Image url"
                      name="imageUrl"
                    />
                  </div>
                  <div className="flex flex-col flex-auto">
                    <label className="leading-loose">Link</label>
                    <Input type="text" placeholder="Link" name="link" />
                  </div>
                </div>

                <div className="flex flex-col">
                  <label className="leading-loose">Coordinate</label>
                  <SearchGeo
                    changeGeo={(geo) => {
                      setGeo(geo);
                    }}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Form;
