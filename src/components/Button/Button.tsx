interface ButtonProps {
  label: string;
  onClick: () => void; // Function to be called when the button is clicked
  isSelected: boolean; // Boolean indicating if the button is in a selected state
}

//Changes button color if continent is selected
const Button = ({ label, onClick, isSelected }: ButtonProps) => {
  const buttonStyle = isSelected
    ? "bg-[#ecb200] text-white"
    : "bg-[#e2e2e2] hover:bg-[#ecb200] hover:text-white";

  return (
    <button
      className={`border-none cursor-pointer w-[153px] h-[50px] rounded-md font-bold text-black ${buttonStyle}`}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default Button; // Export the Button component for use in other parts of the application
