describe("Countries", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/");
  });

  it(`Tests that user score increments when guessed correctly.`, () => {
    cy.wait(2000);

    cy.get('[data-test="user-score"]').then((currentScore) => {
      const initialScore = currentScore.text().trim();

      cy.get('[data-test="current-country"]').then((currentCountry) => {
        const countryText = currentCountry.text().trim();
        cy.get(`[data-test="${countryText}"]`).click();
      });

      cy.get('[data-test="user-score"]').should((newScore) => {
        const updatedScore = newScore.text().trim();
        expect(updatedScore).to.not.equal(initialScore);
      });
    });
  });

  it(`Tests that user loses guess when answered incorrectly.`, () => {
    cy.wait(2000);

    cy.get('[data-test="remaining-guesses"]').then((currentGuesses) => {
      const initialGuesses = currentGuesses.text().trim();

      cy.get('[data-test="current-country"]').then(($currentCountry) => {
        const countryText = $currentCountry.text().trim();

        if (countryText === "Spain") {
          cy.get('[data-test="Italy"]').click();
        } else {
          cy.get('[data-test="Spain"]').click();
        }
      });

      cy.get('[data-test="remaining-guesses"]').should((newGuesses) => {
        const updatedGuesses = newGuesses.text().trim();
        expect(updatedGuesses).to.not.equal(initialGuesses);
      });
    });
  });
});
