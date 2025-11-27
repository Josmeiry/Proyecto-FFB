Cypress.on("uncaught:exception", () => false);

describe("Registro y login", () => {
  it("Registra un usuario y luego inicia sesión", () => {
    cy.visit("http://localhost:5174/login");

    const correoRandom = `camaron_${Date.now()}@gmail.com`;

    // REGISTRO
    cy.get('input[data-cy="nombre-registro"]').type("Camaron Test");
    cy.get('input[data-cy="email-registro"]').type(correoRandom);
    cy.get('input[data-cy="pass-registro"]').type("camaronC123");
    cy.get('button[data-cy="btn-registrar"]').click();

    cy.get('p[data-cy="mensaje"]', { timeout: 20000 }).should(
      "contain.text",
      "Usuario registrado correctamente"
    );

    // LOGIN
    cy.get('input[data-cy="email-login"]').type(correoRandom);
    cy.get('input[data-cy="pass-login"]').type("camaronC123");
    cy.get('button[data-cy="btn-login"]').click();

    cy.get('p[data-cy="mensaje"]', { timeout: 20000 }).should(
      "contain.text",
      "✅ Bienvenido"
    );
  });
});
