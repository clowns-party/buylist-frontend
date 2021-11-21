import { DotsHorizontalIcon } from "@heroicons/react/outline";
import { ProductCard } from "entities/product";
import { ProductProps } from "entities/product/ui/ProductCard";
import { FC } from "react";
import { Dropdown } from "shared/ui";
import { useModal } from "shared/ui/Modal";
import { ProductEditPopup } from "..";

const ProductEditable: FC<ProductProps> = (props) => {
  const { isOpen, openModal, closeModal } = useModal();
  return (
    <>
      <ProductEditPopup
        isOpen={isOpen}
        closeModal={closeModal}
        product={props.product}
      />
      <ProductCard
        {...props}
        header={
          <Dropdown
            items={[{ title: "edit" }, { title: "delete" }]}
            onSelect={(title) => {
              if (title === "edit") {
                openModal();
              }
            }}
            className="flex justify-end"
          >
            <div className="p-2 rounded ml-2 hover:bg-blue-100 text-gray-700">
              <DotsHorizontalIcon className="h-5 w-5 " />
            </div>
          </Dropdown>
        }
      />
    </>
  );
};

export default ProductEditable;
