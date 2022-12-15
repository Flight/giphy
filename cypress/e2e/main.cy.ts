beforeEach(() => {
  cy.intercept("*//api.giphy.com/v1/gifs/trending*", {
    fixture: "trending",
  });
  cy.intercept("*//api.giphy.com/v1/gifs/search*", {
    fixture: "search",
  });
});

it("Renders initial page with trending results", () => {
  cy.visit("http://localhost:4173/");

  cy.findByRole("heading", {
    level: 1,
    name: "Find your perfect gif",
  }).should("exist");

  cy.findByRole("heading", {
    level: 2,
    name: "Trending",
  }).should("exist");

  cy.findByRole("searchbox", {
    name: "Search all the GIFs",
  }).should("exist");

  cy.findByTestId("search-results")
    .findAllByRole("img")
    .eq(0)
    .should(
      "have.attr",
      "src",
      "https://media3.giphy.com/media/WRmtN2kf6j3IZMJNwa/200.webp?cid=9cbc9277t1mgzmlccj681q0cm2ecf2l5vt8hm66t0xif3p6a&rid=200.webp&ct=g"
    );
});

it("Renders the page with search query results", () => {
  cy.visit("http://localhost:4173/?q=nice");

  cy.findByRole("searchbox", {
    name: "Search all the GIFs",
  }).should("have.value", "nice");

  cy.findByRole("heading", {
    level: 2,
    name: "Trending",
  }).should("not.exist");

  cy.findByTestId("search-results")
    .findAllByRole("img")
    .eq(0)
    .should(
      "have.attr",
      "src",
      "https://media3.giphy.com/media/Od0QRnzwRBYmDU3eEO/200.webp?cid=9cbc92778ej6qpbqknkeekpgf07h4qnw86f7nt4c8hjq9hl0&rid=200.webp&ct=g"
    );
});
