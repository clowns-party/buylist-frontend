import { FC, useRef, useState } from "react";
import { PopoverProps } from "react-tiny-popover";
import PopoverNotification from "./Popover";

type Props = {
  containerStyle?: PopoverProps["containerStyle"];
  content: string;
  delay?: number;
};
const Tooltip: FC<Props> = ({
  containerStyle,
  children,
  content,
  delay = 100,
}) => {
  const timeout = useRef<any>(null);
  const effectsTimeout = useRef<any>(null);
  const [effects, setEffects] = useState("");

  const style = containerStyle ? containerStyle : {};
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const show = () => {
    setIsPopoverOpen(true);
    effectsTimeout.current = setTimeout(() => {
      setEffects("opacity-100");
    }, delay);
  };
  const onClear = () => {
    clearTimeout(timeout.current);
    clearTimeout(effectsTimeout.current);
  };
  const onClose = () => {
    onClear();
    if (isPopoverOpen) {
      effectsTimeout.current = setTimeout(() => {
        setEffects("");
      }, delay);

      timeout.current = setTimeout(() => {
        setIsPopoverOpen(false);
      }, delay);
    }
  };
  return (
    <div onMouseLeave={onClose}>
      <PopoverNotification
        isOpen={isPopoverOpen}
        content={() => (
          <div
            className={`p-2 bg-white shadow-md rounded-md transition duration-300 ease-in-out opacity-0 ${effects}`}
            onMouseLeave={(event) => {
              event.stopPropagation();
              onClose();
            }}
            onMouseEnter={onClear}
          >
            <div>{content}</div>
          </div>
        )}
        containerStyle={{
          zIndex: "99",
          ...style,
        }}
      >
        <div onMouseEnter={() => !isPopoverOpen && show()}>{children}</div>
      </PopoverNotification>
    </div>
  );
};

export default Tooltip;
