import loginPage from "../support/pages/LoginPage";
import homePage from "../support/pages/HomePage";

describe("Lista de compras", () => {
  it("deve pesquisar um produto e adicioná-lo à lista", () => {
    const nomeProduto = `Notebook Dell ${Date.now()}`;
    const emailUsuario = `user${Date.now()}@teste.com`;

    cy.obterTokenAdmin().then((token) => {
      cy.criarProduto(token, nomeProduto);
    });

    cy.request("POST", "https://serverest.dev/usuarios", {
      nome: "Usuario Comum",
      email: emailUsuario,
      password: "123456",
      administrador: "false",
    });

    loginPage.visitar();
    loginPage.fazerLogin(emailUsuario, "123456");

    homePage.pesquisarProduto(nomeProduto);
    homePage.adicionarNaLista();

    cy.url().should("include", "/minhaListaDeProdutos");
    cy.contains(nomeProduto).should("be.visible");
  });
});
