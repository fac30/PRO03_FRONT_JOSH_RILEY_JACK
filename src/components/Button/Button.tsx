interface ButtonProps {
  label: string;
  onClick: () => void;
  isSelected: boolean;
}

const Button = ({ label, onClick, isSelected }: ButtonProps) => {
  const buttonStyle = isSelected
    ? "bg-[#ecb200] text-black"
    : "bg-[#e2e2e2] hover:bg-[#ecb200] hover:text-white";

  return (
    <button
      className={`border-none cursor-pointer w-[153px] h-[50px] rounded-md font-bold ${buttonStyle}`}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default Button;
