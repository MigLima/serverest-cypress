class CadastroPage {
  visitar() {
    cy.visit("/login");
    cy.contains("Cadastre-se").click();
  }

  cadastrar(nome, email, senha, administrador = false) {
    cy.get('[data-testid="nome"]').type(nome);
    cy.get('[data-testid="email"]').type(email);
    cy.get('[data-testid="password"]').type(senha);

    if (administrador) {
      cy.get('[data-testid="checkbox"]').check();
    }

    cy.get('[data-testid="cadastrar"]').click();
  }
}

export default new CadastroPage();
