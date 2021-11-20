import { BuylistProps } from "entities/buylist/lib/buylist.types";
import useBuylistEditField from "features/buylist-edit-field/hooks/useBuylistEditField";
import { useRouter } from "next/router";
import { Button, Dropdown } from "shared/ui";
import { Statuses } from "types/types.generated";

type Props = Pick<BuylistProps["buylist"], "status"> &
  Pick<BuylistProps, "editable">;

const DetailsStatus = ({ status: currentStatus, editable }: Props) => {
  const { query } = useRouter();
  const { edit, loading } = useBuylistEditField();
  const id = query?.id?.toString();
  const onSelect = async (status: string) => {
    if (editable && id) {
      await edit({
        id: Number(id),
        field: "status",
        value: status?.toUpperCase(),
      });
    }
  };
  const items = Object.keys(Statuses).map((status) => ({
    title: status,
  }));
  return (
    <div className=" px-1 text-center items-center justify-end flex">
      <Dropdown
        items={items}
        classNameItemsWrap="w-28"
        onSelect={onSelect}
        active={currentStatus}
      >
        <Button className="mt-3 mb-2 items-center" disabled={loading}>
          <a href="#">{currentStatus}</a>
          <svg
            className="h-4 w-4 ml-1 cursor-pointer"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M4.516 7.548c.436-.446 1.043-.481 1.576 0L10 11.295l3.908-3.747c.533-.481 1.141-.446 1.574 0 .436.445.408 1.197 0 1.615-.406.418-4.695 4.502-4.695 4.502a1.095 1.095 0 01-1.576 0S4.924 9.581 4.516 9.163c-.409-.418-.436-1.17 0-1.615z"
            />
          </svg>
        </Button>
      </Dropdown>
    </div>
  );
};

export default DetailsStatus;
