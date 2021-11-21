import { BuylistProps } from "entities/buylist/lib/buylist.types";
import { ProductCard } from "entities/product";
import { ProductCreatePopup } from "features/product-create/ui";
import { ProductEditable } from "features/product-edit/ui";
import { Button } from "shared/ui";
import { useModal } from "shared/ui/Modal";

type Props = Pick<BuylistProps["buylist"], "products"> &
  Pick<BuylistProps, "editable">;

const Products = ({ products, editable }: Props) => {
  const { isOpen, closeModal, openModal } = useModal();
  const ProductType = editable ? ProductEditable : ProductCard;
  return (
    <>
      {editable && isOpen && (
        <ProductCreatePopup isOpen={isOpen} closeModal={closeModal} />
      )}
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
        {editable && <Button onClick={openModal}>Create now product</Button>}
      </div>
    </>
  );
};

export default Products;
