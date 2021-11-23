import { MutableRefObject } from "react";
import { FC, useEffect, useMemo, useRef, useState } from "react";
import { useClickAway, useDebounce } from "react-use";
import { Input } from "..";
import { InputProps } from "../Input";
import { useModal } from "../Modal";

export type SearchItem = { key: number | string; value: string };

type Props = InputProps & {
  onSearch: (query: string) => Promise<any>;
  select: (item: SearchItem | null) => void;
  active: SearchItem | null;
  items: SearchItem[] | null;
};

const SearchInput = ({ onSearch, items, active, select, ...props }: Props) => {
  const { isOpen, closeModal: onClose, openModal: onOpen } = useModal();
  const dropdown = useRef(null);
  const [query, setQuery] = useState("");
  const whiteListId = "input-search-query";
  const noResults = useMemo(
    () => query?.length >= 1 && items?.length === 0,
    [query, items]
  );
  const allowDisplay = useMemo(
    () => items && items?.length >= 0 && isOpen,
    [items, isOpen]
  );

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    props?.onChange?.(event);
    setQuery(event.target.value);
    select(null);
  };

  const [, closeDebounce] = useDebounce(
    async () => {
      if (!query?.length) return;
      await onSearch(query);
    },
    600,
    [query]
  );
  useClickAway(dropdown, (event) => {
    if ((event?.target as any)?.id === whiteListId || !isOpen) {
      return;
    }
    onClose();
  });
  useEffect(() => {
    return () => {
      closeDebounce();
    };
  }, []);

  return (
    <div className="relative">
      <Input
        {...props}
        onChange={onChange}
        id={whiteListId}
        onClick={onOpen}
        onFocus={onOpen}
      />
      {allowDisplay && (
        <SearchInput.DropdownWrapper forwardRef={dropdown}>
          {noResults ? (
            <h2>no results</h2>
          ) : (
            items?.map((item) => {
              return (
                <SearchInput.Item
                  key={item?.key}
                  active={active}
                  select={select}
                  item={item}
                />
              );
            })
          )}
        </SearchInput.DropdownWrapper>
      )}
    </div>
  );
};

type WrapperProps = {
  forwardRef: MutableRefObject<null>;
  children: React.ReactNode;
};
SearchInput.DropdownWrapper = ({ children, forwardRef }: WrapperProps) => {
  return (
    <div
      className="absolute z-10 w-full p-1.5 shadow-md rounded-md mt-1 transform left-0 bg-white overflow-hidden overflow-y-auto"
      style={{ minHeight: "40px", maxHeight: 100 }}
      ref={forwardRef}
    >
      {children}
    </div>
  );
};

type ItemProps = Pick<Props, "select" | "active"> & { item: SearchItem };
SearchInput.Item = ({ item, active, select }: ItemProps) => {
  return (
    <div
      className={`text-left hover:bg-indigo-500 hover:text-white rounded-md mb-2 cursor-pointer p-2 transition delay-75 ease-in-out
  ${item?.key === active?.key ? "bg-indigo-500 text-white ring" : ""}
  `}
      onClick={() => {
        select(item);
      }}
    >
      {item?.value}
    </div>
  );
};

export default SearchInput;
