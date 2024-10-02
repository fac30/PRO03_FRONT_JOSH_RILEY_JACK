import "./Button.css"; // Optional: Add custom styling for the button component

interface ButtonProps {
  label: string;
  onClick: () => void;
}

const Button = ({ label, onClick }: ButtonProps) => {
  return (
    <button className="continent-button" onClick={onClick}>
      {label}
    </button>
  );
};

export default Button;
