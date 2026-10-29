describe("API - Carrinhos", () => {
  it("deve criar um carrinho com sucesso", () => {
    const emailAdmin = `admin${Date.now()}@teste.com`;
    const nomeProduto = `Notebook Dell ${Date.now()}`;

    cy.request("POST", "https://serverest.dev/usuarios", {
      nome: "Admin QA",
      email: emailAdmin,
      password: "123456",
      administrador: "true",
    });

    cy.request("POST", "https://serverest.dev/login", {
      email: emailAdmin,
      password: "123456",
    }).then((login) => {
      const token = login.body.authorization;

      cy.request({
        method: "POST",
        url: "https://serverest.dev/produtos",
        headers: { Authorization: token },
        body: {
          nome: nomeProduto,
          preco: 3500,
          descricao: "Laptop Dell Windows 11 i5",
          quantidade: 20,
        },
      }).then((produto) => {
        const idProduto = produto.body._id;

        cy.request({
          method: "POST",
          url: "https://serverest.dev/carrinhos",
          headers: { Authorization: token },
          body: {
            produtos: [{ idProduto: idProduto, quantidade: 2 }],
          },
        }).then((carrinho) => {
          expect(carrinho.status).to.eq(201);
          expect(carrinho.body.message).to.eq("Cadastro realizado com sucesso");
          expect(carrinho.body).to.have.property("_id");
        });
      });
    });
  });

  it("deve concluir a compra e apagar o carrinho", () => {
    const emailAdmin = `admin${Date.now()}@teste.com`;
    const nomeProduto = `Notebook Dell ${Date.now()}`;

    cy.request("POST", "https://serverest.dev/usuarios", {
      nome: "Admin QA",
      email: emailAdmin,
      password: "123456",
      administrador: "true",
    });

    cy.request("POST", "https://serverest.dev/login", {
      email: emailAdmin,
      password: "123456",
    }).then((login) => {
      const token = login.body.authorization;

      cy.request({
        method: "POST",
        url: "https://serverest.dev/produtos",
        headers: { Authorization: token },
        body: {
          nome: nomeProduto,
          preco: 3500,
          descricao: "Laptop Dell Windows 11 i5",
          quantidade: 20,
        },
      }).then((produto) => {
        const idProduto = produto.body._id;

        cy.request({
          method: "POST",
          url: "https://serverest.dev/carrinhos",
          headers: { Authorization: token },
          body: {
            produtos: [{ idProduto: idProduto, quantidade: 2 }],
          },
        }).then(() => {
          cy.request({
            method: "DELETE",
            url: "https://serverest.dev/carrinhos/concluir-compra",
            headers: { Authorization: token },
          }).then((compra) => {
            expect(compra.status).to.eq(200);
            expect(compra.body.message).to.eq("Registro excluído com sucesso");
          });
        });
      });
    });
  });
});
