const ErrorComponent = ({
  text,
  handleClick,
}: {
  text: string;
  handleClick: () => void;
}) => {
  return (
    <div>
      <div className="text-center">{text}</div>
      <button onClick={handleClick}>Retry</button>
    </div>
  );
};

export default ErrorComponent;
