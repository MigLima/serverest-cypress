describe("API - Usuários", () => {
  it("deve cadastrar um usuário com sucesso", () => {
    cy.request("POST", "https://serverest.dev/usuarios", {
      nome: "Usuario API",
      email: `api${Date.now()}@teste.com`,
      password: "123456",
      administrador: "true",
    }).then((resposta) => {
      expect(resposta.status).to.eq(201);
      expect(resposta.body.message).to.eq("Cadastro realizado com sucesso");
      expect(resposta.body).to.have.property("_id");
    });
  });

  it("não deve cadastrar usuário com e-mail já existente", () => {
    const usuario = {
      nome: "Usuario API",
      email: `api${Date.now()}@teste.com`,
      password: "123456",
      administrador: "true",
    };

    cy.request("POST", "https://serverest.dev/usuarios", usuario);

    cy.request({
      method: "POST",
      url: "https://serverest.dev/usuarios",
      body: usuario,
      failOnStatusCode: false,
    }).then((resposta) => {
      expect(resposta.status).to.eq(400);
      expect(resposta.body.message).to.eq("Este email já está sendo usado");
    });
  });
});
