beforeEach(() => {
  cy.intercept("API_URL", {
    fixture: "search",
  });
});

describe("Renders initial elements", () => {
  it("passes", () => {
    cy.visit("http://localhost:4173/");

    cy.findByRole("heading", { level: 1, name: "App" }).should("exist");
  });
});
