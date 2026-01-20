Cypress.on("uncaught:exception", () => false);

describe("Registro y login", () => {
  it("Registra un usuario y luego inicia sesión", () => {
    cy.visit("http://localhost:5173/login");
    cy.wait(500); // para que cargue Vite
    
    cy.get('input[data-cy="email-login"]').type("jostes@gmail.com");
    cy.get('input[data-cy="pass-login"]').type("12345678");
    cy.get('button[data-cy="btn-login"]').click();
    
    cy.get('p[data-cy="mensaje"]', { timeout: 10000 }).should(
      "contain.text",
      "Bienvenido"
    );
    
    
  });
});
