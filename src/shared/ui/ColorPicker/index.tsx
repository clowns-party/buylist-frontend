import { FC } from "react";
import { useRef } from "react";
import { useState } from "react";
import { useClickAway } from "react-use";
import { Input } from "..";

const data = {
  colors: [
    "gray",
    "red",
    "yellow",
    "green",
    "blue",
    "indigo",
    "purple",
    "pink",
  ],
  // variants: [100, 200, 300, 400, 500, 600, 700, 800, 900],
  variants: [500],
};

type Props = {
  color?: string;
  setColor?: (color: string) => void;
};

const ColorPicker: FC<Props> = ({ color = "red-800", setColor }) => {
  const palette = useRef<HTMLDivElement | null>(null);

  const [currentColor, setCurrentColor] = useState(color);
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  const safeToggle = () => {
    isOpen && toggle();
  };

  const selectColor = (color: string, variant: number) => {
    const selected = `${color}-${variant}`;
    setCurrentColor(selected);
    setColor?.(selected);
  };

  useClickAway(palette, safeToggle);

  return (
    <div className="relative">
      <div className="flex flex-row relative">
        <Input value={currentColor} disabled />
        <div
          onClick={toggle}
          className={`cursor-pointer rounded-full ml-3 my-auto h-10 w-10 flex bg-${currentColor}`}
        />
        <div
          ref={palette}
          style={{
            display: isOpen ? "block" : "none",
          }}
          className="z-10 border border-gray-300 origin-top-right absolute left-0 top-full mt-2 rounded-md shadow-lg"
        >
          <div className="rounded-md bg-white shadow-xs p-2">
            <div className="flex">
              {data.colors.map((color) => (
                <div className="" key={color}>
                  {data?.variants.map((variant) => (
                    <div
                      onClick={() => selectColor(color, variant)}
                      key={variant}
                      className={`cursor-pointer w-6 h-6 rounded-full mx-1 my-1 bg-${color}-${variant}`}
                    ></div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ColorPicker;
