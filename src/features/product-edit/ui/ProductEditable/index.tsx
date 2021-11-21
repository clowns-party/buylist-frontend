import { DotsHorizontalIcon } from "@heroicons/react/outline";
import { ProductCard } from "entities/product";
import { ProductProps } from "entities/product/ui/ProductCard";
import { FC } from "react";
import { Dropdown } from "shared/ui";
import { useModal } from "shared/ui/Modal";
import { ProductDeletePopup, ProductEditPopup } from "..";

const ProductEditable: FC<ProductProps> = (props) => {
  const {
    isOpen: isEditOpen,
    openModal: editOpen,
    closeModal: editClose,
  } = useModal();
  const {
    isOpen: isDeleteOpen,
    openModal: deleteOpen,
    closeModal: deleteClose,
  } = useModal();

  return (
    <>
      <ProductEditPopup
        isOpen={isEditOpen}
        closeModal={editClose}
        product={props.product}
      />
      <ProductDeletePopup
        isOpen={isDeleteOpen}
        closeModal={deleteClose}
        product={props.product}
        variant="transparent"
      />
      <ProductCard
        {...props}
        header={
          <Dropdown
            items={[{ title: "edit" }, { title: "delete" }]}
            onSelect={(title) => {
              if (title === "edit") {
                editOpen();
              }
              if (title === "delete") {
                deleteOpen();
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
