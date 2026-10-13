# ServeRest Cypress

Projeto de automação de testes com **Cypress** e **JavaScript** sobre o [ServeRest](https://serverest.dev), uma aplicação feita para prática de testes. Cobre fluxos de interface (E2E) e testes diretos na API.

Criado para estudo e prática de QA.

## O que é testado

**E2E (interface):**

- Login com credenciais inválidas
- Login válido como administrador
- Cadastro de usuário administrador com sucesso
- Cadastro com e-mail já existente

**API:**

- Cadastro de usuário (status 201, mensagem e `_id` na resposta)
- Cadastro com e-mail já existente (status 400 e mensagem de erro)

## Tecnologias

- Cypress
- JavaScript (Node.js)
- Git e GitHub

## Estrutura do projeto

```
cypress/
  e2e/
    login.cy.js          # testes E2E de login
    cadastro.cy.js       # testes E2E de cadastro
    usuarios-api.cy.js   # testes de API de usuários
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
npx cypress run
```

## Boas práticas aplicadas

- Seletores estáveis com `data-testid`
- URL base configurada em `cypress.config.js`
- Dados dinâmicos (`Date.now()`) para evitar conflito de e-mail entre execuções
- Pré-condições criadas via API (`cy.request`) para deixar os testes de interface mais rápidos e estáveis
- Cenários positivos e negativos

## Próximos passos

- Testes de produtos e carrinho
- Organização com Page Object e comandos customizados
- Relatório de execução
- Pipeline com GitHub Actions

## Autor

Miguel Lima Pires
[LinkedIn](https://linkedin.com/in/miguel-lima-pires)
