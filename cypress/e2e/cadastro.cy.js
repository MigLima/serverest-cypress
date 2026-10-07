describe("Cadastro", () => {
  it("deve cadastrar um usuário administrador com sucesso", () => {
    const email = `qa${Date.now()}@teste.com`;

    cy.visit("/login");
    cy.contains("Cadastre-se").click();

    cy.get('[data-testid="nome"]').type("Usuario QA");
    cy.get('[data-testid="email"]').type(email);
    cy.get('[data-testid="password"]').type("123456");
    cy.get('[data-testid="checkbox"]').check();
    cy.get('[data-testid="cadastrar"]').click();

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

    cy.visit("/login");
    cy.contains("Cadastre-se").click();

    cy.get('[data-testid="nome"]').type("Outro Usuario");
    cy.get('[data-testid="email"]').type(email);
    cy.get('[data-testid="password"]').type("123456");
    cy.get('[data-testid="cadastrar"]').click();

    cy.contains("Este email já está sendo usado").should("be.visible");
  });
});
