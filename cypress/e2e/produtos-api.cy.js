import loginPage from "../support/pages/LoginPage";
import produtosPage from "../support/pages/ProdutosPage";

describe("Produtos", () => {
  beforeEach(() => {
    const email = `qa${Date.now()}@teste.com`;

    cy.request("POST", "https://serverest.dev/usuarios", {
      nome: "Admin QA",
      email: email,
      password: "123456",
      administrador: "true",
    });

    loginPage.visitar();
    loginPage.fazerLogin(email, "123456");
  });

  it("deve cadastrar um produto como administrador", () => {
    const nomeProduto = `Dell Vostro 3520 ${Date.now()}`;

    produtosPage.abrirCadastro();
    produtosPage.cadastrar(
      nomeProduto,
      "3500",
      "Laptop Dell Windows 11 i5",
      "20",
    );

    cy.url().should("include", "/admin/listarprodutos");
    cy.contains(nomeProduto).should("be.visible");
  });

  it("não deve cadastrar produto com nome repetido", () => {
    const nomeProduto = `Dell Vostro 3520 ${Date.now()}`;

    produtosPage.abrirCadastro();
    produtosPage.cadastrar(
      nomeProduto,
      "3500",
      "Laptop Dell Windows 11 i5",
      "20",
    );
    cy.url().should("include", "/admin/listarprodutos");

    produtosPage.abrirCadastro();
    produtosPage.cadastrar(
      nomeProduto,
      "3500",
      "Laptop Dell Windows 11 i5",
      "20",
    );

    cy.contains("Já existe produto com esse nome").should("be.visible");
    cy.get('[data-testid="cadastarProdutos"]').should("be.visible");
  });
});
