describe("API - Carrinhos", () => {
  it("deve criar um carrinho com sucesso", () => {
    cy.obterTokenAdmin().then((token) => {
      cy.criarProduto(token).then((idProduto) => {
        cy.criarCarrinho(token, idProduto).then((carrinho) => {
          expect(carrinho.status).to.eq(201);
          expect(carrinho.body.message).to.eq("Cadastro realizado com sucesso");
          expect(carrinho.body).to.have.property("_id");
        });
      });
    });
  });

  it("deve concluir a compra e apagar o carrinho", () => {
    cy.obterTokenAdmin().then((token) => {
      cy.criarProduto(token).then((idProduto) => {
        cy.criarCarrinho(token, idProduto);

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

  it("deve cancelar a compra e reabastecer o estoque", () => {
    cy.obterTokenAdmin().then((token) => {
      cy.criarProduto(token).then((idProduto) => {
        cy.criarCarrinho(token, idProduto);

        cy.request(`https://serverest.dev/produtos/${idProduto}`).then(
          (antes) => {
            expect(antes.body.quantidade).to.eq(18);
          },
        );

        cy.request({
          method: "DELETE",
          url: "https://serverest.dev/carrinhos/cancelar-compra",
          headers: { Authorization: token },
        }).then((compra) => {
          expect(compra.status).to.eq(200);
          expect(compra.body.message).to.include(
            "Registro excluído com sucesso",
          );
        });

        cy.request(`https://serverest.dev/produtos/${idProduto}`).then(
          (depois) => {
            expect(depois.body.quantidade).to.eq(20);
          },
        );
      });
    });
  });
});
