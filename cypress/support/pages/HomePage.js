class HomePage {
  pesquisarProduto(nome) {
    cy.get('[data-testid="pesquisar"]').type(nome);
    cy.get('[data-testid="botaoPesquisar"]').click();
  }

  adicionarNaLista() {
    cy.get('[data-testid="adicionarNaLista"]').click();
  }
}

export default new HomePage();
