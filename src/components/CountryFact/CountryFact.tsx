// Define the TypeScript interface for the component props
interface CountryFactProps {
  fact: string; // The 'fact' prop is expected to be a string
}

// Create a functional React component called CountryFact
// Destructure 'fact' from the props and apply the type defined in CountryFactProps
const CountryFact = ({ fact }: CountryFactProps) => {
  // Render the 'fact' prop inside an <h2> element
  return <h2>{fact}</h2>;
};

// Export the CountryFact component to make it available for import in other files
export default CountryFact;

