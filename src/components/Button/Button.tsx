import "./Button.css"; // Optional: Add custom styling for the button component

interface ButtonProps {
  label: string;
  onClick: () => void;
}

const Button = ({ label, onClick }: ButtonProps) => {
  return (
    <button
      className="border-none cursor-pointer w-[153px] h-[50px] rounded-md bg-[#e2e2e2] font-bold hover:text-white hover:bg-[#ecb200]"
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default Button;
