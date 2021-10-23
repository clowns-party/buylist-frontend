type Props = {
  loading?: boolean;
  children: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;
const Button = ({ children, loading, ...props }: Props) => {
  return (
    <>
      <button
        {...props}
        className={`h-auto group relative flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
          props?.className || ""
        }`}
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

export default Button;
