import classNames from "classnames";

export type ButtonVariants = "primary" | "text" | "light";

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
    "h-auto group relative flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white disabled:opacity-50 disabled:cursor-not-allowed",
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
        {loading ? (
          <div className="flex justify-center items-center">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-purple-500"></div>
          </div>
        ) : (
          children
        )}
      </button>
    </>
  );
};

const VariantsClassnames = {
  primary:
    "bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2",
  text: "",
  light:
    "rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent",
} as {
  [index in ButtonVariants]: string;
};

export default Button;
