/* eslint-disable react/display-name */
import styled from "styled-components";
import { ReactComponent as ErrorWaring } from "../../icons/error-warning.svg";

type Props = {
  error?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

function Input({ error, ...props }: Props) {
  const className = props?.disabled
    ? Input.VariantClasses.Disabled
    : error
    ? Input.VariantClasses.Error
    : Input.VariantClasses.Base;

  return (
    <div className={`relative ${error ? "mb-6" : ""}`}>
      <input {...props} className={`${className} ${props?.className || ""}`} />
      {error && (
        <>
          <ErrorWaring className="absolute text-red-500 right-2 bottom-3" />
          <Input.ErrorLabel error={error} />
        </>
      )}
    </div>
  );
}

// Sub components
Input.ErrorLabel = ({ error }: { error: string }) => {
  return <p className="absolute text-sm text-red-500 -bottom-6">{error}</p>;
};

// Sub classes
Input.VariantClasses = {
  Base: "rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent",
  Error:
    "ring-red-500 ring-2 rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent",
  Disabled:
    "rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent",
};

export default Input;