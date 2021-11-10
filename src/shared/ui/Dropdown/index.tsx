import { Popover, Transition } from "@headlessui/react";
import { FC } from "hoist-non-react-statics/node_modules/@types/react";
import { Fragment } from "react";

type Props = {
  items: { title: string }[];
  classNameItemsWrap?: string;
  onSelect: (item: string) => void;
  active?: string;
};
const Dropdown: FC<Props> = ({
  items,
  classNameItemsWrap,
  onSelect,
  children,
  active,
}) => {
  return (
    <div>
      <Popover className="relative">
        {({ open }) => (
          <>
            <Popover.Button
              className={`
				  ${open ? "" : "text-opacity-90"}`}
            >
              {children}
            </Popover.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="absolute z-10 max-w-sm px-4 mt-3 transform -translate-x-1/2 left-1/2 sm:px-0">
                <div
                  className={`overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 ${
                    classNameItemsWrap || ""
                  }`}
                >
                  <div className="relative bg-white p-4">
                    {items.map((item) => (
                      <a
                        onClick={() => {
                          onSelect(item.title);
                        }}
                        key={item.title}
                        className={`cursor-pointer flex items-center p-2 -m-3 transition duration-150 ease-in-out rounded-lg hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50
						${active === item.title ? "bg-gray-100" : ""}
						`}
                      >
                        {item.title}
                      </a>
                    ))}
                  </div>
                </div>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    </div>
  );
};

export default Dropdown;
