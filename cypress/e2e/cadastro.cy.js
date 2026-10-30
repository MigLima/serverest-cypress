import cadastroPage from "../support/pages/CadastroPage";

describe("Cadastro", () => {
  it("deve cadastrar um usuário administrador com sucesso", () => {
    const email = `qa${Date.now()}@teste.com`;

    cadastroPage.visitar();
    cadastroPage.cadastrar("Usuario QA", email, "123456", true);

    cy.contains("Cadastro realizado com sucesso").should("be.visible");
  });

  it("não deve cadastrar usuário com e-mail já existente", () => {
    const email = `qa${Date.now()}@teste.com`;

    cy.request("POST", "https://serverest.dev/usuarios", {
      nome: "Usuario QA",
      email: email,
      password: "123456",
      administrador: "true",
    });

    cadastroPage.visitar();
    cadastroPage.cadastrar("Outro Usuario", email, "123456");

    cy.contains("Este email já está sendo usado").should("be.visible");
  });
});
