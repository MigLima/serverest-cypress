describe("Lista de compras", () => {
  it("deve pesquisar um produto e adicioná-lo à lista", () => {
    const emailAdmin = `admin${Date.now()}@teste.com`;
    const emailUsuario = `user${Date.now()}@teste.com`;
    const nomeProduto = `Notebook Dell ${Date.now()}`;

    cy.request("POST", "https://serverest.dev/usuarios", {
      nome: "Admin QA",
      email: emailAdmin,
      password: "123456",
      administrador: "true",
    });

    cy.request("POST", "https://serverest.dev/login", {
      email: emailAdmin,
      password: "123456",
    }).then((resposta) => {
      const token = resposta.body.authorization;

      cy.request({
        method: "POST",
        url: "https://serverest.dev/produtos",
        headers: { Authorization: token },
        body: {
          nome: nomeProduto,
          preco: 3500,
          descricao: "Laptop Dell Windows 11 i5",
          quantidade: 20,
        },
      });
    });

    cy.request("POST", "https://serverest.dev/usuarios", {
      nome: "Usuario Comum",
      email: emailUsuario,
      password: "123456",
      administrador: "false",
    });

    cy.visit("/login");
    cy.get('[data-testid="email"]').type(emailUsuario);
    cy.get('[data-testid="senha"]').type("123456");
    cy.get('[data-testid="entrar"]').click();

    cy.get('[data-testid="pesquisar"]').type(nomeProduto);
    cy.get('[data-testid="botaoPesquisar"]').click();
    cy.get('[data-testid="adicionarNaLista"]').click();

    cy.url().should("include", "/minhaListaDeProdutos");
    cy.contains(nomeProduto).should("be.visible");
  });
});
