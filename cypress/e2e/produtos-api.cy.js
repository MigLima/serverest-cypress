describe("API - Produtos", () => {
  it("deve cadastrar um produto com token de administrador", () => {
    cy.obterTokenAdmin().then((token) => {
      cy.criarProduto(token).then((idProduto) => {
        expect(idProduto).to.be.a("string");
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
