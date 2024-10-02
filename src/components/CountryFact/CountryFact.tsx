interface CountryFactProps {
  fact: string;
}

const CountryFact = ({ fact }: CountryFactProps) => {
  return <h2>{fact}</h2>;
};

export default CountryFact;
