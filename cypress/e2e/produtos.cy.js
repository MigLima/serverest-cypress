describe("Produtos", () => {
  it("deve cadastrar um produto como administrador", () => {
    const email = `qa${Date.now()}@teste.com`;
    const nomeProduto = `Dell Vostro 3520 ${Date.now()}`;

    cy.request("POST", "https://serverest.dev/usuarios", {
      nome: "Admin QA",
      email: email,
      password: "123456",
      administrador: "true",
    });

    cy.visit("/login");
    cy.get('[data-testid="email"]').type(email);
    cy.get('[data-testid="senha"]').type("123456");
    cy.get('[data-testid="entrar"]').click();

    cy.get('[data-testid="cadastrar-produtos"]').click();

    cy.get('[data-testid="nome"]').type(nomeProduto);
    cy.get('[data-testid="preco"]').type("3500");
    cy.get('[data-testid="descricao"]').type("Laptop Dell Windows 11 i5");
    cy.get('[data-testid="quantity"]').type("20");
    cy.get('[data-testid="cadastarProdutos"]').click();

    cy.url().should("include", "/admin/listarprodutos");
    cy.contains(nomeProduto).should("be.visible");
  });

  it("não deve cadastrar produto com nome repetido", () => {
    const email = `qa${Date.now()}@teste.com`;
    const nomeProduto = `Dell Vostro 3520 ${Date.now()}`;

    cy.request("POST", "https://serverest.dev/usuarios", {
      nome: "Admin QA",
      email: email,
      password: "123456",
      administrador: "true",
    });

    cy.visit("/login");
    cy.get('[data-testid="email"]').type(email);
    cy.get('[data-testid="senha"]').type("123456");
    cy.get('[data-testid="entrar"]').click();

    cy.get('[data-testid="cadastrar-produtos"]').click();
    cy.get('[data-testid="nome"]').type(nomeProduto);
    cy.get('[data-testid="preco"]').type("3500");
    cy.get('[data-testid="descricao"]').type("Laptop Dell Windows 11 i5");
    cy.get('[data-testid="quantity"]').type("20");
    cy.get('[data-testid="cadastarProdutos"]').click();

    cy.url().should("include", "/admin/listarprodutos");

    cy.get('[data-testid="cadastrar-produtos"]').click();
    cy.get('[data-testid="nome"]').type(nomeProduto);
    cy.get('[data-testid="preco"]').type("3500");
    cy.get('[data-testid="descricao"]').type("Laptop Dell Windows 11 i5");
    cy.get('[data-testid="quantity"]').type("20");
    cy.get('[data-testid="cadastarProdutos"]').click();

    cy.contains("Já existe produto com esse nome").should("be.visible");
    cy.get('[data-testid="cadastarProdutos"]').should("be.visible");
  });
});
