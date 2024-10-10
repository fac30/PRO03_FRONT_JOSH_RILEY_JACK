describe("Continent Buttons", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/");
  });

  const continents = [
    "North America",
    "South America",
    "Asia",
    "Europe",
    "Africa",
  ];

  continents.forEach((continent) => {
    it(`generates a new country and fact when '${continent}' clicked`, () => {
      cy.get('[data-test="current-country"]').then(($currentCountry) => {
        const initialCountry = $currentCountry.text().trim();

        cy.get('[data-test="country-fact"]').then(($currentFact) => {
          const initialFact = $currentFact.text().trim();

          cy.get(`[data-test="continent-button-${continent}"]`).click();

          cy.get('[data-test="current-country"]').should(($newCountry) => {
            const updatedCountry = $newCountry.text().trim();
            expect(updatedCountry).to.not.equal(initialCountry);
          });

          cy.get('[data-test="country-fact"]').should(($newFact) => {
            const updatedFact = $newFact.text().trim();
            expect(updatedFact).to.not.equal(initialFact);
          });
        });
      });
    });
  });
});
