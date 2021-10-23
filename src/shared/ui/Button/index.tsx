type Props = {
  loading?: boolean;
  children: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;
const Button = ({ children, loading, ...props }: Props) => {
  return (
    <>
      <button {...props}
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
