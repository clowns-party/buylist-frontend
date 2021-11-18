import { BuylistProps } from "entities/buylist/lib/buylist.types";

type Field = keyof Pick<
  BuylistProps["buylist"],
  "description" | "name" | "status"
>;

export type EditableFieldProps = {
  field: Field;
};
