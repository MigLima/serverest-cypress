describe("Login", () => {
  it("deve exibir erro com credenciais inválidas", () => {
    cy.visit("/login");

    cy.get('[data-testid="email"]').type("naoexiste@teste.com");
    cy.get('[data-testid="senha"]').type("senhaerrada");
    cy.get('[data-testid="entrar"]').click();

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

    cy.visit("/login");
    cy.get('[data-testid="email"]').type(email);
    cy.get('[data-testid="senha"]').type("123456");
    cy.get('[data-testid="entrar"]').click();

    cy.url().should("include", "/admin/home");
  });
});
