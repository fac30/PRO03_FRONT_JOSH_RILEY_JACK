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
});
