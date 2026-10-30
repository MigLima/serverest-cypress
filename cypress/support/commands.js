// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add("obterTokenAdmin", () => {
  const email = `admin${Date.now()}@teste.com`;

  cy.request("POST", "https://serverest.dev/usuarios", {
    nome: "Admin QA",
    email: email,
    password: "123456",
    administrador: "true",
  });

  cy.request("POST", "https://serverest.dev/login", {
    email: email,
    password: "123456",
  }).then((login) => login.body.authorization);
});

Cypress.Commands.add(
  "criarProduto",
  (token, nome = `Notebook Dell ${Date.now()}`) => {
    cy.request({
      method: "POST",
      url: "https://serverest.dev/produtos",
      headers: { Authorization: token },
      body: {
        nome: nome,
        preco: 3500,
        descricao: "Laptop Dell Windows 11 i5",
        quantidade: 20,
      },
    }).then((produto) => produto.body._id);
  },
);

Cypress.Commands.add("criarCarrinho", (token, idProduto) => {
  cy.request({
    method: "POST",
    url: "https://serverest.dev/carrinhos",
    headers: { Authorization: token },
    body: {
      produtos: [{ idProduto: idProduto, quantidade: 2 }],
    },
  });
});
