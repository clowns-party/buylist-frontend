import { DotsHorizontalIcon } from "@heroicons/react/outline";
import { BuylistNavProps } from "entities/buylist/ui/Elements/Nav";
import { useAuth } from "features/auth/lib/hooks/useAuth";
import { FC } from "react";
import { Dropdown } from "shared/ui";
import { useDeleteBuylist } from "../hooks/useDeleteBuylist";
import { useLeaveFromBuylist } from "../hooks/useLeaveFromBuylist";

const BuylistActions: FC<Pick<BuylistNavProps, "id" | "owner" | "editable">> =
  ({ id, owner, editable }) => {
    const { user, loading } = useAuth();
    const { onDelete: actionDelete, loading: deleteLoading } =
      useDeleteBuylist();
    const { onLeave: actionLeave, loading: leaveLoading } =
      useLeaveFromBuylist();

    const compoundLoader = deleteLoading || leaveLoading || loading;

    const onDelete = async () => {
      if (!editable || compoundLoader || !id) {
        return;
      }
      await actionDelete(id);
    };
    const onLeave = async () => {
      if (!editable || compoundLoader || !id) {
        return;
      }
      await actionLeave(id);
    };
    const actions =
      owner?.id === user?.id ? [{ title: "delete" }] : [{ title: "leave" }];

    const executeAction = async (title: string) => {
      if (title === "delete") {
        await onDelete();
      }
      if (title === "leave") {
        await onLeave();
      }
    };
    return (
      <Dropdown items={actions} onSelect={executeAction}>
        <div className="p-2 rounded ml-2 hover:bg-blue-100 text-gray-700">
          <DotsHorizontalIcon className="h-5 w-5 " />
        </div>
      </Dropdown>
    );
  };
export default BuylistActions;
