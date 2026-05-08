describe("Integridad API Login", () => {

  it("Valida respuesta correcta del backend", () => {

    cy.request({
      method: "POST",
      url: "https://proyecto-bff.onrender.com/login-usuario",
      body: {
        correo: "jostest@gmail.com",
        contrasena: "joshi"
      }
    }).then((response) => {

      expect(response.status).to.eq(200);

      expect(response.body.usuario).to.have.property("correo");

    });

  });

});