import { Mark } from "entities/hooks/useMark";
import MapModal from "entities/map/ui/Modal";
import { ProductFields } from "features/create-buylist/lib/types";
import { FC, useState } from "react";
import { Button } from "shared/ui";
import styled from "styled-components";
import { cardFontColor, isDateExpired } from "../lib";
import { Product } from "../lib/types";

export type ProductProps = {
  product: Product | ProductFields;
  className?: string;
  header?: React.ReactNode;
};

const ProductCard: FC<ProductProps> = ({ product, className, header }) => {
  let [isOpen, setIsOpen] = useState(false);
  const mark: Mark = {
    position: product?.coordinate,
    content: {
      body: product?.comment,
      header: product?.name,
    },
  };
  const { titleColor, textColor } = cardFontColor(product?.color || "");

  return (
    <div
      className={`shadow-lg rounded-2xl bg-white w-80 p-2 ${className || ""}`}
    >
      {header || ""}
      {product?.imageUrl && (
        <img
          src={product?.imageUrl}
          alt={product?.name || ""}
          className="w-max-32 p-4 h-36 m-auto"
          style={{ borderRadius: 30 }}
        />
      )}
      <div className={`bg-${product?.color} m-3 p-4 rounded-lg relative`}>
        <p className={`${titleColor} text-xl font-semibold `}>
          {product?.name || "-"}
        </p>
        <p className={`${textColor} text-xs`}>{product?.comment || "-"}</p>
        {product?.buyBefore && (
          <p className={`${textColor}`}>
            Buy before:{" "}
            <b
              className={`${textColor} font-medium ${
                isDateExpired(product?.buyBefore) && "line-through"
              }`}
            >
              {product?.buyBefore}
            </b>
          </p>
        )}

        <Footer>
          {product?.coordinate?.length && (
            <>
              <Button
                className="bg-white py-2 px-3 mr-2 hover:bg-gray-100"
                variant="textBordered"
                style={{ borderRadius: 22 }}
                onClick={() => {
                  setIsOpen(true);
                }}
              >
                Look on map
              </Button>

              <MapModal
                coordinate={product?.coordinate}
                marks={[mark]}
                isOpen={isOpen}
                setIsOpen={setIsOpen}
              />
            </>
          )}
          <Button
            variant="textBordered"
            className="bg-white py-2 px-3 hover:bg-gray-50"
            style={{ borderRadius: 22 }}
          >
            <a href={product.link || ""} target="_blank" rel="noreferrer">
              ${product?.price || 0}
            </a>
          </Button>
        </Footer>
      </div>
    </div>
  );
};
const Footer = styled.div`
  justify-content: end;
  margin-top: 40px;
  display: flex;
  align-items: end;
`;
export default ProductCard;
