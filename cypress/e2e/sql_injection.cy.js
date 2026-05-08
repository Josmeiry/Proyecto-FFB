describe("Seguridad login", () => {

  it("Bloquea SQL Injection", () => {

    cy.visit("https://majoad.space/login");

    cy.get('[data-cy="email-login"]')
      .type("' OR '1'='1");

    cy.get('[data-cy="pass-login"]')
      .type("' OR '1'='1");

    cy.get('[data-cy="btn-login"]')
      .click();

    cy.url().should("not.include", "/homeview");

  });

});