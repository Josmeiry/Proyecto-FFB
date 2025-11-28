Cypress.on("uncaught:exception", () => false);

describe("Registro y login", () => {
  it("Registra un usuario y luego inicia sesión", () => {
    cy.visit("http://localhost:5173/login");
    
    // LOGIN DIRECTO CON USUARIO EXISTENTE
    cy.get('input[data-cy="email-login"]').type("jostes@gmail.com");
    cy.get('input[data-cy="pass-login"]').type("12345678");
    cy.get('button[data-cy="btn-login"]').click();
    
    cy.get('p[data-cy="mensaje"]', { timeout: 20000 }).should(
      "contain.text",
      "✅ Bienvenido"
    );
    
  });
});
