import classNames from "classnames";
import { Loader } from "../Loader/Loader";

export type ButtonVariants =
  | "primary"
  | "text"
  | "light"
  | "textBordered"
  | "danger";

type Props = {
  loading?: boolean;
  variant?: ButtonVariants;
  children: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button = ({
  children,
  loading,
  variant = "primary",
  ...props
}: Props) => {
  const className = classNames(
    "h-auto group relative flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md disabled:opacity-50 disabled:cursor-not-allowed",
    VariantsClassnames[variant],
    props?.className || ""
  );
  return (
    <>
      <button
        {...props}
        className={className}
        disabled={props?.disabled || loading}
      >
        {loading && <Loader.Small />}
        {children}
      </button>
    </>
  );
};

const VariantsClassnames = {
  primary:
    "items-center bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg",
  text: "",
  danger:
    "border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500",
  textBordered: "focus:outline-none focus:ring-2 focus:ring-offset-2",
  light:
    "bg-white hover:bg-gray-100 focus:ring-indigo-500 focus:ring-offset-indigo-200 text-indigo-500 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg",
} as {
  [index in ButtonVariants]: string;
};

export default Button;
