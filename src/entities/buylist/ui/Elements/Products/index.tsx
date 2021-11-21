import { BuylistProps } from "entities/buylist/lib/buylist.types";
import { ProductCard } from "entities/product";
import { ProductEditable } from "features/product-edit/ui";
import { Button } from "shared/ui";

type Props = Pick<BuylistProps["buylist"], "products"> &
  Pick<BuylistProps, "editable">;

const Products = ({ products, editable }: Props) => {
  const ProductType = editable ? ProductEditable : ProductCard;
  return (
    <>
      <div className=" flex flex-row flex-wrap py-1 mt-5 text-sm font-medium text-gray-800">
        {products?.map((product) => (
          <ProductType
            product={product}
            key={product?.id}
            className="mb-10 mr-4"
          />
        ))}
      </div>
      <div className="mb-10 pb-20">
        <Button>Create now product</Button>
      </div>
    </>
  );
};

export default Products;
