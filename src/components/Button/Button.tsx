// Define the properties that the Button component will accept
interface ButtonProps {
  label: string; // The text label to be displayed on the button
  onClick: () => void; // Function to be called when the button is clicked
  isSelected: boolean; // Boolean indicating if the button is in a selected state
}

// Functional component for Button
const Button = ({ label, onClick, isSelected }: ButtonProps) => {
  // Determine the button's style based on whether it is selected
  const buttonStyle = isSelected
    ? "bg-[#ecb200] text-black" // Style for selected button
    : "bg-[#e2e2e2] hover:bg-[#ecb200] hover:text-white"; // Style for unselected button with hover effects

  return (
    <button
      // Assign CSS classes to style the button
      className={`border-none cursor-pointer w-[153px] h-[50px] rounded-md font-bold ${buttonStyle}`}
      onClick={onClick} // Attach the onClick event handler
    >
      {label} {/* Display the label prop as the button text */}
    </button>
  );
};

export default Button; // Export the Button component for use in other parts of the application

