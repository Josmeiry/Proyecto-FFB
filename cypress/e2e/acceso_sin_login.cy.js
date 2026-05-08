describe("Seguridad rutas privadas", () => {

  it("No permite entrar al admin sin login", () => {

    cy.visit("https://majoad.space/admin-dashboard");

    cy.url().should("not.include", "admin-dashboard");

  });

});