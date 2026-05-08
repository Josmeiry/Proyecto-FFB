Cypress.on("uncaught:exception", () => false);

describe("Integridad login", () => {

  it("contraseña incorrecta", () => {

    cy.visit("https://majoad.space/login");

    cy.get('[data-cy="email-login"]')
      .type("jostest@gmail.com");

    cy.get('[data-cy="pass-login"]')
      .type("claveincorrecta");

    cy.get('[data-cy="btn-login"]')
      .click();

    // Espera redirección
    cy.url({ timeout: 10000 })
      .should("include", "/homeview");

  });

});