describe("Seguridad login", () => {

  it("Bloquea SQL Injection", () => {

    cy.visit("https://majoad.space/login-usuario");

    cy.get('input[type="email"]')
      .type("' OR '1'='1");

    cy.get('input[type="password"]')
      .type("' OR '1'='1");

    cy.contains("button", "Entrar")
      .click();

    cy.url().should("not.include", "/homeview");

  });

});