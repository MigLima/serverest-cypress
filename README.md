# ServeRest Cypress

Projeto de automação de testes com **Cypress** e **JavaScript** sobre o [ServeRest](https://serverest.dev), uma aplicação feita para prática de testes. Cobre fluxos de interface (E2E) e testes diretos na API.

Criado para estudo e prática de QA.

## O que é testado

**E2E (interface), 7 testes:**

- Login com credenciais inválidas e login válido como administrador
- Cadastro de usuário administrador e cadastro com e-mail já existente
- Cadastro de produto e cadastro com nome repetido
- Usuário comum pesquisando um produto e adicionando à lista de compras

**API, 7 testes:**

- Usuários: cadastro com sucesso (201) e e-mail duplicado (400)
- Produtos: cadastro com token de administrador e recusa sem token (401)
- Carrinhos: criar carrinho, concluir compra e cancelar compra, validando que o estoque é reabastecido

## Limitação conhecida

A tela de carrinho do ServeRest está "em construção". Por isso, o fluxo de carrinho e compra é testado apenas pela API.

## Tecnologias

- Cypress
- JavaScript (Node.js)
- Git e GitHub

## Estrutura do projeto

```
cypress/
  e2e/
    login.cy.js
    cadastro.cy.js
    produtos.cy.js
    lista-compras.cy.js
    usuarios-api.cy.js
    produtos-api.cy.js
    carrinhos-api.cy.js
  support/
    commands.js          # comandos customizados (obterTokenAdmin, criarProduto, criarCarrinho)
    pages/               # Page Objects (LoginPage, CadastroPage, ProdutosPage, HomePage)
cypress.config.js        # configuração (baseUrl)
package.json
```

## Como rodar

Pré-requisito: [Node.js](https://nodejs.org) instalado.

```bash
git clone https://github.com/MigLima/serverest-cypress.git
cd serverest-cypress
npm install
```

Dependendo da configuração do npm, o script de pós-instalação do Cypress pode ser bloqueado. Se isso acontecer, rode:

```bash
npx cypress install
```

Para abrir a interface do Cypress:

```bash
npx cypress open
```

Para rodar todos os testes no terminal:

```bash
npx cypress run --browser chrome
```

## Boas práticas aplicadas

- Seletores estáveis com `data-testid`
- **Page Object** para as telas de login, cadastro, produtos e home
- **Comandos customizados** para montar dados pela API (administrador com token, produto e carrinho)
- Dados dinâmicos (`Date.now()`) para evitar conflito entre execuções
- Pré-condições criadas via API (`cy.request`) para deixar os testes de interface mais rápidos e estáveis
- Cenários positivos e negativos, incluindo validação de erro esperado (400 e 401)

## Próximos passos

- Pipeline com GitHub Actions
- Relatório de execução

## Autor

Miguel Lima Pires
[LinkedIn](https://linkedin.com/in/miguel-lima-pires)
