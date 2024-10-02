// Import the external CSS file for the Button component.
import "./Button.css"; 

// Define the TypeScript interface for the component props
interface ButtonProps {
  label: string; // 'label' prop is a string and represents the text to be displayed on the button
  onClick: () => void; // 'onClick' prop is a function, and it doesn't return anything (void)
}

// Create a functional React component called Button
// Destructure 'label' and 'onClick' from the props using the ButtonProps interface for type safety
const Button = ({ label, onClick }: ButtonProps) => {
  return (
    // Render a button element with a custom class name 'continent-button'
    // Assign the 'onClick' function to the button's onClick event handler
    <button className="continent-button" onClick={onClick}>
      {label} {/* Display the button label text */}
    </button>
  );
};

// Export the Button component to make it available for import and use in other files
export default Button;

