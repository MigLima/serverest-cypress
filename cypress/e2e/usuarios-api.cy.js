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
});
