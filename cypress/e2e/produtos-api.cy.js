describe("API - Produtos", () => {
  it("deve cadastrar um produto com token de administrador", () => {
    const emailAdmin = `admin${Date.now()}@teste.com`;

    cy.request("POST", "https://serverest.dev/usuarios", {
      nome: "Admin QA",
      email: emailAdmin,
      password: "123456",
      administrador: "true",
    });

    cy.request("POST", "https://serverest.dev/login", {
      email: emailAdmin,
      password: "123456",
    }).then((login) => {
      const token = login.body.authorization;

      cy.request({
        method: "POST",
        url: "https://serverest.dev/produtos",
        headers: { Authorization: token },
        body: {
          nome: `Notebook Dell ${Date.now()}`,
          preco: 3500,
          descricao: "Laptop Dell Windows 11 i5",
          quantidade: 20,
        },
      }).then((produto) => {
        expect(produto.status).to.eq(201);
        expect(produto.body.message).to.eq("Cadastro realizado com sucesso");
        expect(produto.body).to.have.property("_id");
      });
    });
  });

  it("não deve cadastrar produto sem token", () => {
    cy.request({
      method: "POST",
      url: "https://serverest.dev/produtos",
      body: {
        nome: `Notebook Dell ${Date.now()}`,
        preco: 3500,
        descricao: "Laptop Dell Windows 11 i5",
        quantidade: 20,
      },
      failOnStatusCode: false,
    }).then((produto) => {
      expect(produto.status).to.eq(401);
      expect(produto.body.message).to.include("Token de acesso");
    });
  });
});
