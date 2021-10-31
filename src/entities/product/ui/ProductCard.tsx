import Map from "entities/map";
import { FC } from "hoist-non-react-statics/node_modules/@types/react";
import { CreateProductBuyListInput } from "types/types.generated";

type Props = {
  product: CreateProductBuyListInput;
};

const Card: FC<Props> = ({ product }) => {
  return (
    <div className="shadow-lg rounded-2xl bg-white w-auto m-auto p-2">
      <div className="flex">
        <div className="w-64">
          {product?.imageUrl && (
            <img
              src={product?.imageUrl}
              alt={product?.name || ""}
              className="w-max-32 p-4 h-36 m-auto"
              style={{ borderRadius: 30 }}
            />
          )}
          <div className="bg-pink-200 m-3 p-4 rounded-lg">
            <p className="text-white text-xl font-bold ">Adidas</p>
            <p className="text-gray-50 text-xs">Live your dream</p>
            <div className="flex items-center justify-between ">
              <p className="text-white">$98.00</p>
              <button
                type="button"
                className="w-10 h-10 text-base font-medium rounded-full text-white bg-pink-500 hover:bg-pink-700"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  className="mx-auto"
                  fill="white"
                  viewBox="0 0 1792 1792"
                >
                  <path d="M1600 736v192q0 40-28 68t-68 28h-416v416q0 40-28 68t-68 28h-192q-40 0-68-28t-28-68v-416h-416q-40 0-68-28t-28-68v-192q0-40 28-68t68-28h416v-416q0-40 28-68t68-28h192q40 0 68 28t28 68v416h416q40 0 68 28t28 68z"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
        <div className="flex-auto">
          <Map center={product.coordinate as any} />
        </div>
      </div>
    </div>
  );
};
export default Card;
