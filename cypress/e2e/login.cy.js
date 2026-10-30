import loginPage from "../support/pages/LoginPage";

describe("Login", () => {
  it("deve exibir erro com credenciais inválidas", () => {
    loginPage.visitar();
    loginPage.fazerLogin("naoexiste@teste.com", "senhaerrada");

    cy.contains("Email e/ou senha inválidos").should("be.visible");
  });

  it("deve fazer login com sucesso como administrador", () => {
    const email = `qa${Date.now()}@teste.com`;

    cy.request("POST", "https://serverest.dev/usuarios", {
      nome: "Usuario QA",
      email: email,
      password: "123456",
      administrador: "true",
    });

    loginPage.visitar();
    loginPage.fazerLogin(email, "123456");

    cy.url().should("include", "/admin/home");
  });
});
