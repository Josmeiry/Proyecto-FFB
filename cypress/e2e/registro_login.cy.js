Cypress.on("uncaught:exception", () => false);

describe("Login usuario", () => {

  it("Inicia sesión correctamente", () => {

    cy.visit("https://majoad.space/login");

    cy.get('[data-cy="email-login"]')
      .type("jostest@gmail.com");

    cy.get('[data-cy="pass-login"]')
      .type("joshi");

    cy.get('[data-cy="btn-login"]')
      .click();

    // Espera redirección
    cy.url({ timeout: 10000 })
      .should("include", "/homeview");

  });

});