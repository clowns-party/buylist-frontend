import { Popover, PopoverProps } from "react-tiny-popover";

type Props = {
  children: React.ReactNode;
} & PopoverProps;
const PopoverNotification = ({ children, containerStyle, ...props }: Props) => {
  return (
    <Popover
      padding={3}
      reposition={false}
      positions={["top", "left"]}
      containerStyle={containerStyle}
      {...props}
    >
      {children}
    </Popover>
  );
};

export default PopoverNotification;
