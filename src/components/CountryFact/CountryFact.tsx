interface CountryFactProps {
  fact: string;
}

const CountryFact = ({ fact }: CountryFactProps) => {
  return (
    <h2 data-test="country-fact" className="m-auto w-3/6 text-center">
      {fact}
    </h2>
  );
};

export default CountryFact;
